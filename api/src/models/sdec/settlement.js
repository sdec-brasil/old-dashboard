// Nota de Pagamento
export default function (sequelize, DataTypes) {
  const settlement = sequelize.define('settlement', {
    guid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    data_emisaso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pendente', 'pago', 'vencido', 'cancelado'],
      allowNull: false,
      defaultValue: 'pendente',
    },
  },
  {
    underscored: true,
    tableName: 'settlement',
    freezeTableName: true,
  });

  settlement.associate = (models) => {
    settlement.hasMany(models.invoice, { as: 'Invoices' }); // Not sure if allowNull works here
    settlement.belongsTo(models.empresa, { targetKey: 'enderecoBlockchain', foreignKey: { name: 'empresa_responsavel', allowNull: false } });
  };

  return settlement;
}
