// Nota_Pagamento
export default function (sequelize, DataTypes) {
  const estado = sequelize.define('estado', {
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
    timestamps: false,
  });

  return estado;
}
