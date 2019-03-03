// Nota_fiscal
// Para obter mais informacoes ( https://gist.github.com/tloriato/3a59843a6826afc23c4f6ebaf078166f )

export default (sequelize, DataTypes) => sequelize.define('nota_fiscal', {
  id_transacao: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false, // fazer referencia para a tabela empresa
  },
  id_municipio: {
    type: DataTypes.INTEGER,
    allowNull: false, // referenciar tabela de prefeitura
  },
  id_bloco: {
    type: DataTypes.STRING,
    allowNull: false,
    // referenciar tabela de blocos
  },
  id_nota_substituida: {
    type: DataTypes.STRING,
    allowNull: true,
    // tem que ter um validador pra checar se a id da nota substituida existe no banco
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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  valor_servicos: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor_deducoes: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  valor_pis: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor_cofins: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor_inss: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor_ir: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor_csll: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  outras_retencoes: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor_total_tributos: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  desconto_incondicionado: {
    type: DataTypes.DOÙBLE,
    allowNull: false,
  },
  desconto_condicionado: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  iss_retido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  responsavel_retencao: {
    type: DataTypes.INTEGER, // sistema de codigos descrito no gist do tiago
    allowNull: false,
  },
  codigo_cnae: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo_nbs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo_tributacao_municipio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discriminacao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pais_prestacao_servico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // se for null entao eh brasil, ou algo do tipo. Tem isso explicitado no gist do Tiago
  },
  exibilidade_iss: {
    type: DataTypes.INTEGER, // esse codigo eh descrito no gist
    allowNull: false,
  },
  numero_processo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regime_especial_tributacao: {
    type: DataTypes.INTEGER,
    allowNull: false, // codigo explicito no gist sobre nfse do tiago
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
});
