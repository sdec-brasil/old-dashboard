// Authorization Code
export default function (sequelize, DataTypes) {
  const authorization_code = sequelize.define('authorization_code', {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    redirectUris: {
      type: DataTypes.STRING,
      allowNull: false,
      /* We have to support an Array of URI's, but later
      get() {
        return this.getDataValue('redirectUris').split(';');
      },
      set(val) {
        this.setDataValue('redirectUris', val.join(';'));
      }, */
    },
  }, {
    underscored: true,
    tableName: 'authorization_code',
  });

  authorization_code.associate = (models) => {
    authorization_code.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
    authorization_code.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } });
  };

  return authorization_code;
}
