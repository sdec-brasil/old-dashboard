// nota_fiscal
export default function (sequelize, DataTypes) {
  const nota_fiscal = sequelize.define('nota_fiscal', {
    txid: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    base_calculo: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    aliquota_servicos: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_iss: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_liquido_nota: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    competencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    valor_servicos: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    valor_deducoes: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    valor_pis: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    valor_cofins: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    valor_inss: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    valor_ir: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    valor_csll: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    outras_retencoes: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    valor_total_tributos: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    aliquota: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    desconto_incondicionado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    desconto_condicionado: {
      type: DataTypes.DECIMAL,
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
    exigibilidade_iss: {
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
      type: DataTypes.DATE,
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
    timestamps: false,
  });

  /* nota_fiscal.associate = (models) => {
    nota_fiscal.belongsTo(models.empresa, { foreignKey: { name: 'cnpj_empresa', allowNull: false } });
    nota_fiscal.belongsTo(models.nota_fiscal, { as: 'NotaSubstituida', foreignKey: 'id_nota_substituta' });
    nota_fiscal.belongsTo(models.prefeitura, { as: 'Municipio', foreignKey: { name: 'cod_prefeitura', allowNull: false }, onDelete: 'CASCADE' });
    nota_fiscal.belongsTo(models.prefeitura, { as: 'MunicipioPrestacaoServico', foreignKey: { name: 'cod_municipio_prestacao_servico', allowNull: false }, onDelete: 'CASCADE' });
    nota_fiscal.belongsTo(models.prefeitura, { as: 'MunicipioIncidencia', foreignKey: 'cod_municipio_incidencia' });
  }; */
  return nota_fiscal;
}
