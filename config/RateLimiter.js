module.exports = {
  points: 10, // Number of points
  duration: 1, // Per second(s)

  // Custom
  execEvenly: false, // Do not delay actions evenly
  blockDuration: 1, // Do not block if consumed more than points
  keyPrefix: 'apiLimiter', // must be unique for limiters with different purpose
};
