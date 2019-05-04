// Token
export default function (sequelize, DataTypes) {
  const token = sequelize.define('token', {
    token: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV1,
      primaryKey: true,
    },
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
