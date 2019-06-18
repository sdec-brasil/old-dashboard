export default function (sequelize, DataTypes) {
  const txinSeq = sequelize.define('txin_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'txin_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return txinSeq;
}
