// Stream
export default function (sequelize, DataTypes) {
  const stream = sequelize.define('stream', {
    stream_id: {
      type: DataTypes.STRING(),
      primaryKey: true,
    },
    creation_txid: {
      type: DataTypes.STRING(65),
      allowNull: false,
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

  stream.associate = (models) => {
    stream.belongsTo(models.estado, { foreignKey: { name: 'estado', allowNull: false } });
  };

  return stream;
}
