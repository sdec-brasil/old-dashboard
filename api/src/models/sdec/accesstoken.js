export default function (sequelize, DataTypes) {
  // The access tokens.
  // You will use these to access your end point data through the means outlined
  // in the RFC The OAuth 2.0 Authorization Framework: Bearer Token Usage
  // (http://tools.ietf.org/html/rfc6750)
  const accesstoken = sequelize.define('accesstoken', {
    token: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV1,
      primaryKey: true,
    },
  }, {
    underscored: true,
    tableName: 'accesstoken',
  });

  accesstoken.associate = (models) => {
    accesstoken.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } });
    accesstoken.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
  };

  return accesstoken;
}
