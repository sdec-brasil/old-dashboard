import { crypto } from '../../utils/crypto';

// User
export default function (sequelize, DataTypes) {
  /**
   * This is the model  of the users that are allowed to connected to your authorization
   * server. These represent users of different client applications that can connect to the
   * authorization server. At a minimum you need the required properties of
   *
   * id       : A unique numeric id of your user
   * username : The user name of the user
   * password : The password of your user
   * name     : The name of your user
   */
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'user',
  });

  user.associate = (models) => {
    user.hasMany(models.conta_bancaria, { primaryKey: { name: 'user_id' } });
  };

  user.beforeSave((userInstance, options) => {
    // now we only want to re-hash the password if it was changed.
    // Otherwise we are going to be hashing a hash, and the user will lose its login.
    if (userInstance._changed.password) {
      // generate a salt
      const salt = crypto.generateSalt();
      // hash the password
      userInstance.password = crypto.hashPassword(userInstance.password, salt);
    }
    return userInstance;
  });

  return user;
}
