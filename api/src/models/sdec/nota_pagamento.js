// nota_pagamento
export default function (sequelize, DataTypes) {
  const nota_pagamento = sequelize.define('nota_pagamento', {
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

  nota_pagamento.associate = (models) => {
    nota_pagamento.belongsTo(models.Nota_Fiscal, { primaryKey: { name: 'id_nota', allowNull: false } });
    nota_pagamento.belongsTo(models.Empresa, { primaryKey: { name: 'cnpj_empresa', allowNull: false } });
    nota_pagamento.belongsTo(models.Metodo_Pagamento, { primaryKey: { name: 'id_metodo', allowNull: false } });
  };

  return nota_pagamento;
}
