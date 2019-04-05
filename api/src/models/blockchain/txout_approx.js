export default function (sequelize, DataTypes) {
  return sequelize.define('txout_approx', {
    txout_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tx_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    txout_approx_value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    tableName: 'txout_approx',
  });
}
