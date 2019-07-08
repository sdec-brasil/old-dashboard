// Valor das Notas de Pagamento para cada Prefeitura
export default function (sequelize, DataTypes) {
  const settlementValues = sequelize.define('settlementValues', {
    valor: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
    tableName: 'settlementValues',
    freezeTableName: true,
  });

  return settlementValues;
}
