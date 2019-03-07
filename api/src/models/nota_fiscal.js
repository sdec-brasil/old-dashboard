// Nota_fiscal
// Para obter mais informacoes ( https://gist.github.com/tloriato/3a59843a6826afc23c4f6ebaf078166f )

export default (sequelize, DataTypes) => sequelize.define(
  'nota_fiscal',
  {
    id_transacao: {
      type: DataTypes.STRING(64),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    /* cnpj: {
      type: DataTypes.STRING(14),
      allowNull: false, // fazer referencia para a tabela empresa
    }, */
    /* id_municipio: {
      type: DataTypes.STRING(7),
      allowNull: false, // referenciar tabela de prefeitura
    }, */
    /* id_bloco: {
      type: DataTypes.STRING(64),
      allowNull: false,
      // referenciar tabela de blocos
    }, */
    /* id_nota_substituida: {
      type: DataTypes.STRING(64),
      allowNull: true,
      // tem que ter um validador pra checar se a id da nota substituida existe no banco
    }, */
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
      type: DataTypes.TEXT(2000),
      allowNull: false,
    },
    /* municipio_prestacao_servico: {
      type: DataTypes.STRING(7),
      allowNull: false,
    }, */
    pais_prestacao_servico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // se for null entao eh brasil, ou algo do tipo. Tem isso explicitado no gist do Tiago
    },
    /* municipio_incidencia: {
      type: DataTypes.STRING(7),
      allowNull: true,
    }, */
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
    /* boleto_correspondente: {
      // chave estrangeira pra tabela de boletos
      type: DataTypes.STRING(48),
      allowNull: true,
      defaultValue: null,
    }, */
  },
  {
    underscored: true,
  },
);
