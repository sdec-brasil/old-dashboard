// Boleto
export default (sequelize, DataTypes) => sequelize.define(
  'boleto',
  {
    guid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    num_boleto: {
      type: DataTypes.STRING(48),
      allowNull: false,
      unique: true,
    },
    data_pagamento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    data_vencimento: {
      type: DataTypes.DATEONLY,
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
    tableName: 'boleto',
    freezeTableName: true,
  },
);
