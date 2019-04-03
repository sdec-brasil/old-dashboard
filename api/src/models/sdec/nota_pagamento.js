// Nota_Pagamento
export default function (sequelize, DataTypes) {
  const Nota_Pagamento = sequelize.define('Nota_Pagamento', {
    guid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    data_emisaso: {
      type: DataTypes.DATEONLY,
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
    tableName: 'nota_pagamento',
    freezeTableName: true,
  });

  Nota_Pagamento.associate = (models) => {
    Nota_Pagamento.belongsTo(models.Nota_Fiscal, { primaryKey: { name: 'id_nota', allowNull: false } });
    Nota_Pagamento.belongsTo(models.Empresa, { primaryKey: { name: 'cnpj_empresa', allowNull: false } });
    Nota_Pagamento.belongsTo(models.Metodo_Pagamento, { primaryKey: { name: 'id_metodo', allowNull: false } });
  };

  return Nota_Pagamento;
}
