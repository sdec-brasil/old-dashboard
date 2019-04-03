// Nota_fiscal
export default function (sequelize, DataTypes) {
  const Nota_Fiscal = sequelize.define('Nota_Fiscal', {
    id_nota: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncremenet: true,
      allowNull: false,
    },
    base_calculo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    aliquota_servicos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    valor_iss: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    valor_liquido_nota: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    competencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    valor_servicos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    valor_deducoes: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    valor_pis: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    valor_cofins: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    valor_inss: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    valor_ir: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    valor_csll: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    outras_retencoes: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    valor_total_tributos: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    aliquota: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    desconto_incondicionado: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    desconto_condicionado: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    iss_retido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    responsavel_retencao: {
      type: DataTypes.INTEGER, // sistema de codigos descrito no gist do tiago
      allowNull: true,
    },
    item_lista_servico: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    codigo_cnae: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    codigo_nbs: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
    codigo_tributacao_municipio: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    discriminacao: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    pais_prestacao_servico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // se for null entao eh brasil, ou algo do tipo. Tem isso explicitado no gist do Tiago
    },
    exibilidade_iss: {
      type: DataTypes.INTEGER, // esse codigo eh descrito no gist
      allowNull: false,
    },
    numero_processo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    regime_especial_tributacao: {
      type: DataTypes.INTEGER,
      allowNull: true, // codigo explicito no gist sobre nfse do tiago
    },
    optante_simples_nacional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    incentivo_fiscal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    data_emissao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado: {
      type: DataTypes.SMALLINT, // 0 - pendente, 1 - atrasado, 2 - pago, 3 - substituida
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
    tableName: 'nota_fiscal',
    freezeTableName: true,
  });

  Nota_Fiscal.associate = (models) => {
    Nota_Fiscal.belongsTo(models.Empresa, { foreignKey: { name: 'cnpj_empresa', allowNull: false } });
    Nota_Fiscal.belongsTo(models.Nota_Fiscal, { as: 'NotaSubstituida', foreignKey: 'id_nota_substituta' });
    Nota_Fiscal.belongsTo(models.Prefeitura, { as: 'Municipio', foreignKey: { name: 'cod_prefeitura', allowNull: false }, onDelete: 'CASCADE' });
    Nota_Fiscal.belongsTo(models.Prefeitura, { as: 'MunicipioPrestacaoServico', foreignKey: { name: 'cod_municipio_prestacao_servico', allowNull: false }, onDelete: 'CASCADE' });
    Nota_Fiscal.belongsTo(models.Prefeitura, { as: 'MunicipioIncidencia', foreignKey: 'cod_municipio_incidencia' });
  };
  return Nota_Fiscal;
}
