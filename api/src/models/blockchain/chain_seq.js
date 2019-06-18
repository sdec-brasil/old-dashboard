export default function (sequelize, DataTypes) {
  const chainSeq = sequelize.define('chain_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'chain_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return chainSeq;
}
