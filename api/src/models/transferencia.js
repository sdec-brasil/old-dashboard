// Transferencia
export default (sequelize, DataTypes) => sequelize.define('transferencia', {
  id_transferencia: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  endereco_remetente: {
    type: DataTypes.STRING,
    allowNull: false,
    // tem que criar referencia pra tabela endereco_blockchain
    // deve ser possivel, ao inves de botar DataTypes.STRING, botar DataTypes.Endereco_blockchain.
    // Pode ter alguma burocracia antes de fazer isso, mas se der pra fazer eh melhor
  },
  endereco_destinatario: {
    type: DataTypes.STRING,
    allowNull: false,
    // tambem eh chave estrangeira p/ tabela endereco_blockchain
  },
  tamanho_em_bytes: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  data_transferencia: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  input_value: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  output_value: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  taxa: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  id_bloco: {
    type: DataTypes.STRING,
    allowNull: false,
    // chave estrangeira, tem que criar a relacao
  },
});
