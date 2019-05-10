export default function (sequelize, DataTypes) {
// The refresh tokens.
// You will use these to get access tokens to access your end point data through the means outlined
// in the RFC The OAuth 2.0 Authorization Framework: Bearer Token Usage
// (http://tools.ietf.org/html/rfc6750)
  const refresh_token = sequelize.define('refresh_token', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'refresh_token',
  });

  refresh_token.associate = (models) => {
    refresh_token.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } });
    refresh_token.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
  };

  return refresh_token;
}
