export default function (sequelize, DataTypes) {
  return sequelize.define('asset_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'asset_seq',
  });
}
