export default function (sequelize, DataTypes) {
  const txSeq = sequelize.define('tx_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'tx_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return txSeq;
}
