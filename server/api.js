const express = require('express');
const apiRouter = express.Router();
const db = require('./db')
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

apiRouter.get(`/minions`, (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'))
})

apiRouter.post('/minions', (req, res, next) => {
  res.send(db.addToDatabase('minions', req.body));
})

apiRouter.route('/minions/:minionId')
  .get((req, res, next) => {res.send(db.getFromDatabaseById('minions', req.params.minionId))})
  .put((req,res,next) => {
    req.body.id = req.params.minionId;
    res.send(db.updateInstanceInDatabase('minions', req.body))
  })
  .delete((req, res, next) => {res.send(db.deleteFromDatabasebyId('minions', req.params.minionId))})

  apiRouter.get(`/ideas`, (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'))
  })
  
  apiRouter.post('/ideas', (req, res, next) => {
    if(!checkMillionDollarIdea(req.body.numWeeks, req.body.weeklyRevenue)){
      res.status(400).send('Idea does not worth a million dollars!')
    }
    res.send(db.addToDatabase('ideas', req.body));
  })
  
  apiRouter.route('/ideas/:ideaId')
    .get((req, res, next) => {res.send(db.getFromDatabaseById('ideas', req.params.ideaId))})
    .put((req,res,next) => {
      if(!checkMillionDollarIdea(req.body.numWeeks, req.body.weeklyRevenue)){
        res.status(400).send('Idea does not worth a million dollars!')
      }
      req.body.id = req.params.ideaId;
      res.send(db.updateInstanceInDatabase('ideas', req.body))
    })
    .delete((req, res, next) => {res.send(db.deleteFromDatabasebyId('ideas', req.params.ideaId))})

    apiRouter.route('/meetings')
    .get((req, res, next) => res.send(db.getAllFromDatabase('meetings')))
    .post((req, res, next) => res.send(db.addToDatabase('meetings', req.body)))
    .delete((req, res, next) => res.send(db.deleteAllFromDatabase('meetings')));

  apiRouter.route('/minions/:minionId/work')
    .get((req,res,next) => {
      res.send(db.getAllFromDatabase('work').filter(elem => elem.minionId === req.params.minionId))
    })
    .post((req,res,next) => {
      res.send(db.addToDatabase('work', req.body))
    })
  
  apiRouter.route('/minions/:minionId/work/:workId')
    .put((req,res, next)=> {
      req.body.id = req.params.workId;
      res.send(db.updateInstanceInDatabase('work', req.body))
    })
    .delete((req,res, next)=> {
      const deletedItem = db.getFromDatabaseById('work', req.params.workId)
      db.deleteFromDatabasebyId('work', req.params.workId)
      res.send(deletedItem);
    })


module.exports = apiRouter;
