import { crypto } from '../../utils/crypto';

// User
export default function (sequelize, DataTypes) {
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
    user.belongsTo(models.empresa, { targetKey: 'cnpj', foreignKey: { name: 'empresaCnpj', allowNull: true } });
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
