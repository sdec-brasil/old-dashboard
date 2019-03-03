// Bloco
export default (sequelize, DataTypes) => {
  return sequelize.define("bloco", {
    id_bloco: {
      type: DataTypes.String,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    hash_bloco: {
      type: DataTypes.String,
      allowNull: false
    },
    num_transacoes: {
      type: DataTypes.Integer,
      allowNull: false
    },
    output_total: {
      type: DataTypes.Double,
      allowNull: false
    },
    volume_transacao: {
      type: DataTypes.Double,
      allowNull: false
    },
    altura: {
      type: DataTypes.Integer,
      allowNull: false
    },
    data_emissao: {
      type: DataTypes.Time,
      allowNull: false
    },
    minerador: {
      // precisa ser associado ao endereco de algum minerador
      type: DataTypes.String,
      allowNull: false
    },
    dificuldade: {
      type: DataTypes.Double,
      allowNull: false
    },
    total_bits: {
      type: DataTypes.Integer,
      allowNull: false
    },
    nonce: {
      type: DataTypes.Integer,
      allowNull: false
    },
    recompensa: {
      type: DataTypes.Double,
      allowNull: false
    }
  });
};
