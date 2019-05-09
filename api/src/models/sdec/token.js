// Token
export default function (sequelize, DataTypes) {
  const token = sequelize.define('token', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    exp_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    scope: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, {
    underscored: true,
    tableName: 'token',
  });

  token.associate = (models) => {
    token.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } });
    token.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
  };

  return token;
}
