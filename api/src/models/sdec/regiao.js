// Regiao
export default function (sequelize, DataTypes) {
  const stream = sequelize.define('regiao', {
    regiao_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(65),
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'stream',
    timestamps: false,
  });

  return stream;
}
