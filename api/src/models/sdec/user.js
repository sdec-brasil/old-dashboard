// User
export default function (sequelize, DataTypes) {
  const user = sequelize.define('user', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(),
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
