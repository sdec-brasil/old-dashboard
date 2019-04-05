export default function (sequelize, DataTypes) {
  return sequelize.define('txin_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'txin_seq',
  });
}
