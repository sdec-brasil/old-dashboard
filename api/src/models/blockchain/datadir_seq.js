export default function (sequelize, DataTypes) {
  const datadirSeq = sequelize.define('datadir_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'datadir_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return datadirSeq;
}
