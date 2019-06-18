export default function (sequelize, DataTypes) {
  const assetSeq = sequelize.define('asset_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'asset_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return assetSeq;
}
