// User
export default (sequelize, DataTypes) => sequelize.define(
  'user',
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
    tableName: 'user',
    freezeTableName: true,
  },
);
