// Empresa
export default (sequelize, DataTypes) => sequelize.define('empresa', {
  cnpj: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  razao_social: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  nome_fantasia: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  endereco_empresa: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  numero_endereco: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  complemento_endereco: {
    type: DataTypes.TEXT,
  },
  bairro_endereco: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cidade_endereco: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  unidade_federacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais_endereco: {
    type: DataTypes.TEXT,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false, // talvez possa ser null, not sure
  },
  id_transacao_de_registro: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // tem que fazer a ligacao com a tabela transferencias
  },
  id_bloco_de_registro: {
    type: DataTypes.STRING,
    allowNull: false,
    // fazer a ligacao com a tabela bloco
  },
  endereco_blockchain: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // fazer a ligacao com a tabela endereco_blockchain
  },
});
