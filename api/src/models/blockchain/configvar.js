export default function (sequelize, DataTypes) {
  const configvar = sequelize.define('configvar', {
    configvar_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    configvar_value: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'configvar',
    freezeTableName: true,
    timestamps: false,
  });
  return configvar;
}
