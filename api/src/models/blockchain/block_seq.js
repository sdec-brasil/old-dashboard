/* jshint indent: 2 */

export default function (sequelize, DataTypes) {
  const blockSeq = sequelize.define('block_seq', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    tableName: 'block_seq',
    freezeTableName: true,
    timestamps: false,
  });
  return blockSeq;
}
