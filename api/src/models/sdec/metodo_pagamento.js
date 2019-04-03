// Metodo_Pagamento
// Num primeiro momento esse vai ser um modelo frankenstein, quando tivermos melhor a nocao do dominio vamos dividir em varias tabelas
export default function (sequelize, DataTypes) {
  const Metodo_Pagamento = sequelize.define('Nota_Pagamento', {
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
  Metodo_Pagamento.associate = (models) => {
    Metodo_Pagamento.belongsTo(models.Empresa, { primaryKey: { name: 'cnpj_empresa', allowNull: false } });
  };

  return Metodo_Pagamento;
}
