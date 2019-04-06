export default function (sequelize, DataTypes) {
  return sequelize.define('txout_approx', {
    txout_id: {
      type: DataTypes.DECIMAL(26),
      allowNull: false,
    },
    tx_id: {
      type: DataTypes.DECIMAL(26),
      allowNull: false,
    },
    txout_approx_value: {
      type: DataTypes.DECIMAL(30),
      allowNull: false,
    },
  }, {
    tableName: 'txout_approx',
    engine: 'MYISAM',
  });
}
