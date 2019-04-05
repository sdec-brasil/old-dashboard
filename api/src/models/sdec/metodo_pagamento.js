// Metodo_Pagamento
// Num primeiro momento esse vai ser um modelo frankenstein, quando tivermos melhor a nocao do dominio vamos dividir em varias tabelas
export default function (sequelize, DataTypes) {
  const metodo_pagamento = sequelize.define('nota_pagamento', {
    metodo_pagamento_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    especificidades_de_cada_metodo: {
      type: DataTypes.STRING(200),
      primaryKey: true,
    },
  },
  {
    underscored: true,
    tableName: 'metodo_pagamento',
    freezeTableName: true,
  });

  // Isso ainda deve ser determinado
  metodo_pagamento.associate = (models) => {
    metodo_pagamento.belongsTo(models.empresa, { primaryKey: { name: 'cnpj_empresa', allowNull: false } });
  };

  return metodo_pagamento;
}
