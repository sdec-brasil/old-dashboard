// Empresa
export default function (sequelize, DataTypes) {
  const empresa = sequelize.define('empresa', {
    cnpj: {
      type: DataTypes.STRING(14),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    endereco_blockchain: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
    },
    razao_social: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false,
    },
    nome_fantasia: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    endereco_empresa: {
      type: DataTypes.STRING(125),
      allowNull: false,
    },
    numero_endereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    complemento_endereco: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    bairro_endereco: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cidade_endereco: {
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    unidade_federacao: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    pais_endereco: {
      type: DataTypes.STRING(4),
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
    timestamps: false,
  });

  empresa.associate = (models) => {
    empresa.hasMany(models.nota_fiscal, { primaryKey: { name: 'cnpj_empresa' } });
  };


  return empresa;
}
