const checkMillionDollarIdea = (numWeeks, weeklyRevenue) => {
  return numWeeks*weeklyRevenue >= 1000000;
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
