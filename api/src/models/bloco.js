// Bloco
export default (sequelize, DataTypes) => sequelize.define(
  'bloco',
  {
    hash_bloco: {
      type: DataTypes.STRING(64),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    num_transacoes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    output_total: {
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
    dificuldade: {
      type: DataTypes.INTEGER,
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
  },
  {
    underscored: true,
  },
);
