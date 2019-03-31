export default function (sequelize, DataTypes) {
  return sequelize.define('Configvar', {
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
  });
}
