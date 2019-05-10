export default function (sequelize, DataTypes) {
  // The access tokens.
  // You will use these to access your end point data through the means outlined
  // in the RFC The OAuth 2.0 Authorization Framework: Bearer Token Usage
  // (http://tools.ietf.org/html/rfc6750)
  const access_token = sequelize.define('access_token', {
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
    },
  }, {
    underscored: true,
    tableName: 'access_token',
  });

  access_token.associate = (models) => {
    access_token.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } });
    access_token.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
  };

  return access_token;
}
