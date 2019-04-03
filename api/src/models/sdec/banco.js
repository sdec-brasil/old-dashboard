// Banco
export default function (sequelize, DataTypes) {
  const Banco = sequelize.define('Banco', {
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
  Banco.associate = (models) => {
    Banco.hasMany(models.Conta_Bancaria, { primaryKey: 'banco_id' });
  };

  return Banco;
}
