// Client
import { crypto } from '../../utils/crypto';


export default function (sequelize, DataTypes) {
  /**
   * This is the configuration of the clients that are allowed to connected to your authorization
   * server. These represent client applications that can connect. At a minimum you need the required
   * properties of
   *
   * id:           A unique uuid of your client application
   * name:         The name of your client application
   * secret: A unique password(ish) secret that is _best not_ shared with anyone but your
   *               client application and the authorization server.
   *
   * Optionally you can set these properties which are
   *
   * trusted: default if missing is false. If this is set to true then the client is regarded
   * as a trusted client and not a 3rd party application. That means that the user will not be
   * presented with a decision dialog with the trusted application and that the trusted application
   * gets full scope access without the user having to make a decision to allow or disallow the scope
   * access.
   */
  const client = sequelize.define('client', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    trusted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    underscored: true,
    tableName: 'client',
  });

  client.beforeSave((clientInstance, options) => {
    // now we only want to re-hash the password if it was changed.
    // Otherwise we are going to be hashing a hash, and the user will lose its login.
    if (clientInstance._changed.secret) {
      // generate a salt
      const salt = crypto.generateSalt();
      // hash the password
      clientInstance.secret = crypto.hashPassword(clientInstance.secret, salt);
    }
    return clientInstance;
  });

  return client;
}
