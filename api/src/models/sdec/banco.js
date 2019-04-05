// Banco
export default function (sequelize, DataTypes) {
  const banco = sequelize.define('banco', {
    banco_id: {
      type: DataTypes.STRING(),
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'banco',
  });

  // not quite sure that this is necessary
  banco.associate = (models) => {
    banco.hasMany(models.conta_bancaria, { primaryKey: 'banco_id' });
  };

  return banco;
}
