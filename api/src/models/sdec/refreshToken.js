export default function (sequelize, DataTypes) {
// The refresh tokens.
// You will use these to get access tokens to access your end point data through the means outlined
// in the RFC The OAuth 2.0 Authorization Framework: Bearer Token Usage
// (http://tools.ietf.org/html/rfc6750)
  const refreshToken = sequelize.define('refreshToken', {
    token_secret: {
      type: DataTypes.TEXT('long'),
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'refreshToken',
  });

  refreshToken.associate = (models) => {
    refreshToken.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } });
    refreshToken.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
  };

  return refreshToken;
}
