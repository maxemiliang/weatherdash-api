module.exports.getModels = (models, route) => {
  const modelObject = {};
  route.forEach((model) => {
    modelObject[model] = models[model];
  });

  return modelObject;
};