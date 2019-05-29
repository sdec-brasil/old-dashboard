// nota_fiscal parcial -> Sem offchain-data
export default function (sequelize, DataTypes) {
  const nota_fiscal_parcial = sequelize.define('nota_fiscal_parcial', {
    txid: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    data_emissao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'nota_fiscal_parcial',
    freezeTableName: true,
    timestamps: false,
  });

  nota_fiscal_parcial.associate = (models) => {
    nota_fiscal_parcial.belongsTo(models.empresa, { targetKey: 'endereco_blockchain', foreignKey: { name: 'endereco_emissor', allowNull: false } });
  };

  return nota_fiscal_parcial;
}
