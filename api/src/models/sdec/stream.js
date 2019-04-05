// Stream
export default function (sequelize, DataTypes) {
  return sequelize.define('stream', {
    stream_id: {
      type: DataTypes.STRING(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'stream',
  });
}
