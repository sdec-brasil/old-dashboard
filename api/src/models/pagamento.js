// Pagamento
export default (sequelize, DataTypes) => sequelize.define('pagamento', {
  id_pagamento: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  id_nota: {
    // chave estrangeira p/ tabela nota-fiscal
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
