export default function (sequelize, DataTypes) {
  // The access tokens.
  // You will use these to access your end point data through the means outlined
  // in the RFC The OAuth 2.0 Authorization Framework: Bearer Token Usage
  // (http://tools.ietf.org/html/rfc6750)
  const accessToken = sequelize.define('accessToken', {
    token_secret: {
      type: DataTypes.TEXT('long'),
    },
    exp_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'accessToken',
  });

  accessToken.associate = (models) => {
    accessToken.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: true } });
    accessToken.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
  };

  return accessToken;
}
