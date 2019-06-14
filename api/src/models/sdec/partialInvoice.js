// partial_invoice -> Sem offchain-data
export default function (sequelize, DataTypes) {
  const partialInvoice = sequelize.define(
    'partialInvoice',
    {
      txId: {
        type: DataTypes.STRING(64),
        primaryKey: true,
      },
      dataEmissao: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      tableName: 'partialInvoices',
      freezeTableName: true,
      timestamps: false,
    },
  );

  partialInvoice.associate = (models) => {
    partialInvoice.belongsTo(models.empresa, {
      targetKey: 'enderecoBlockchain',
      foreignKey: { name: 'enderecoEmissor', allowNull: false },
    });
  };

  return partialInvoice;
}
