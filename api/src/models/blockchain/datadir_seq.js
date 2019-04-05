export default function (sequelize, DataTypes) {
  return sequelize.define('datadir_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'datadir_seq',
  });
}
