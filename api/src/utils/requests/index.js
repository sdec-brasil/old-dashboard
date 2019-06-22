const requests = Object.create(null);

requests.patch = async (model, pk, req, excludedKeys) => {
  const instance = await model.findByPk(pk);
  const updateKeys = {};
  Object.keys(req.body).forEach((key) => {
    // check if key exists and is allowed to be updated
    if (instance.dataValues.hasOwnProperty(key) && !(excludedKeys.includes(key))) {
      updateKeys[key] = req.body[key];
    }
  });
  return instance.update(updateKeys);
};

export default requests;
