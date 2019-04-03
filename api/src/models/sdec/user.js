// User
export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID(),
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

  User.associate = (models) => {
    User.hasMany(models.Conta_Bancaria, { primaryKey: { name: 'user_id' } });
  };

  return User;
}
