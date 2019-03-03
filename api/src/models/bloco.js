// Bloco
export default (sequelize, DataTypes) => sequelize.define('bloco', {
  id_bloco: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  hash_bloco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  num_transacoes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  output_total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  volume_transacao: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  altura: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_emissao: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  minerador: {
    // chave_estrangeira
    type: DataTypes.STRING,
    allowNull: false,
  },
  dificuldade: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  total_bits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nonce: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recompensa: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});
