// Stream
export default function (sequelize, DataTypes) {
  const stream = sequelize.define(
    'stream',
    {
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
    },
    {
      underscored: true,
      tableName: 'stream',
      timestamps: false,
    },
  );

  stream.associate = (models) => {
    stream.belongsTo(models.regiao, {
      targetKey: 'nome_regiao',
      foreignKey: { name: 'nome_regiao', allowNull: false },
    });
    stream.belongsTo(models.regiao, {
      targetKey: 'uf',
      foreignKey: { name: 'uf', allowNull: false },
    });
  };

  return stream;
}
