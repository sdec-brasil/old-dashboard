import models from '../../models';
import { requests } from '../../utils';


const getClientInfo = (req) => {
  const client = JSON.parse(JSON.stringify(req.user));
  client.secret = undefined;
  return { code: 200, data: client };
};


const updateClient = async (req) => {
  const excludedKeys = ['id', 'trusted', 'createdAt', 'updatedAt'];
  return requests.patch(models.client, req.user.id, req, excludedKeys)
    .then((updatedClient) => {
    // remove password before returning the updated user
      updatedClient.secret = undefined;
      return { code: 200, data: updatedClient };
    }).catch((err) => { throw err; });
};


const createNewClient = async (req) => {
  const newClientInfo = {
    name: req.body.name,
    secret: req.body.secret,
  };
  return models.client.create(newClientInfo)
    .then((newClient) => {
      newClient.secret = undefined;
      return { code: 200, data: newClient };
    })
    .catch((err) => { throw err; });
};

const deleteClient = async (req) => {
  const clientId = req.user.id;
  return Promise.all([
    models.authorizationCode.destroy({
      where:
      {
        client_id: clientId,
      },
    }),
    models.accessToken.destroy({
      where: {
        client_id: clientId,
      },
    }),
    models.refreshToken.destroy({
      where: {
        client_id: clientId,
      },
    }),
    (await models.client.findByPk(clientId)).destroy(),
  ])
    .then(() => ({ code: 200, data: { success: 'Deleted client and revoked all his tokens.' } }))
    .catch((err) => {
      throw err;
    });
};


export default {
  getClientInfo,
  updateClient,
  createNewClient,
  deleteClient,
};
