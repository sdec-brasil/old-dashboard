// Boleto
export default (sequelize, DataTypes) => sequelize.define(
  'boleto',
  {
    num_boleto: {
      type: DataTypes.STRING(48),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    data_pagamento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    data_vencimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.SMALLINT, // 0 - pendente, 1 - pago, 2 - expirado
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
    tableName: 'boleto',
    freezeTableName: true,
  },
);
