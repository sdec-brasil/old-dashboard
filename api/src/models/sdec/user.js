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
  };

  return user;
}
