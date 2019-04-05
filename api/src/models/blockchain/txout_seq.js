export default function (sequelize, DataTypes) {
  return sequelize.define('txout_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'txout_seq',
  });
}
