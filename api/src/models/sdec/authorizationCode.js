// Authorization Code
export default function (sequelize, DataTypes) {
  const authorizationCode = sequelize.define('authorizationCode', {
    code_secret: {
      type: DataTypes.TEXT('long'),
    },
    redirect_uri: {
      type: DataTypes.STRING,
      allowNull: false,
      //   lets start with only one uri for now ;)

      /* We have to support an Array of URI's, but later
                    get() {
                        return this.getDataValue('redirectUris').split(';');
                    },
                    set(val) {
                        this.setDataValue('redirectUris', val.join(';'));
                    }, */
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '*',
    },
  }, {
    underscored: true,
    tableName: 'authorizationCode',
  });

  authorizationCode.associate = (models) => {
    authorizationCode.belongsTo(models.client, { targetKey: 'id', foreignKey: { name: 'client_id', allowNull: false } });
    authorizationCode.belongsTo(models.user, { targetKey: 'id', foreignKey: { name: 'user_id', allowNull: false } });
  };

  return authorizationCode;
}
