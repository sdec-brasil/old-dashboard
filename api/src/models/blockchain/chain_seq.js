export default function (sequelize, DataTypes) {
  return sequelize.define('chain_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'chain_seq',
  });
}
