export default function (sequelize, DataTypes) {
  return sequelize.define('tx_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'tx_seq',
  });
}
