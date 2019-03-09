// Endereco_blockchain
export default (sequelize, DataTypes) => sequelize.define(
  'endereco_blockchain',
  {
    endereco: {
      type: DataTypes.STRING(35),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    saldo_atual: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    underscored: true,
    tableName: 'endereco_blockchain',
    freezeTableName: true,
  },
);
