module.exports.getModels = (models, route) => {
  const modelObject = {};
  route.forEach((model) => {
    modelObject[model] = models[model];
  });

  return modelObject;
};

module.exports.getAverage = async (data, interval) => {
  const average = {};
  data.forEach((element) => {
    console.log(element);
  });
  return average;
};
