// Empresa
export default (sequelize, DataTypes) => sequelize.define(
  'empresa',
  {
    cnpj: {
      type: DataTypes.STRING(14),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    razao_social: {
      type: DataTypes.TEXT(150),
      unique: true,
      allowNull: false,
    },
    nome_fantasia: {
      type: DataTypes.TEXT(60),
      allowNull: false,
    },
    endereco_empresa: {
      type: DataTypes.TEXT(125),
      allowNull: false,
    },
    numero_endereco: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    complemento_endereco: {
      type: DataTypes.TEXT(60),
      allowNull: true,
    },
    bairro_endereco: {
      type: DataTypes.TEXT(60),
      allowNull: false,
    },
    cidade_endereco: {
      type: DataTypes.TEXT(7),
      allowNull: false,
    },
    unidade_federacao: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    pais_endereco: {
      type: DataTypes.TEXT(4),
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    underscored: true,
    tableName: 'empresa',
    freezeTableName: true,
  },
);
