// Nota_Pagamento
export default function (sequelize, DataTypes) {
  const Estado = sequelize.define('Estado', {
    sigla: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'estado',
    freezeTableName: true,
  });

  return Estado;
}
