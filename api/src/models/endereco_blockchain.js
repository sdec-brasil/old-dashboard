// Endereco_blockchain
export default (sequelize, DataTypes) => sequelize.define('endereco_blockchain', {
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  saldo_atual: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
});
