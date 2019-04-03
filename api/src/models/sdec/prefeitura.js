// Prefeitura
export default (sequelize, DataTypes) => sequelize.define(
  'Prefeitura',
  {
    codigo_municipio: {
      type: DataTypes.STRING(7),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'prefeitura',
    freezeTableName: true,
  },
);
