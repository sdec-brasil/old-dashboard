// nota_fiscal
// invoice
export default function (sequelize, DataTypes) {
  const invoice = sequelize.define('invoice', {
    txId: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    substitutes: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    substitutedBy: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    // ----- Campos da Prestação:
    baseCalculo: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: false,
    },
    aliqServicos: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valLiquiNfse: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    competencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    valServicos: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: false,
    },
    valDeducoes: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valPis: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valCofins: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valInss: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valIr: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valCsll: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    outrasRetencoes: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valTotalTributos: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    valIss: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: false,
    },
    descontoIncond: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    descontoCond: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: true,
    },
    issRetido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    respRetencao: {
      // Informado somente se IssRetido igual a "true".
      // A opção “2 – Intermediário” somente poderá ser selecionada
      // se “CpfCnpjIntermediario” informado.
      //       * `1` - Tomador
      //       * `2` - Intermediário
      type: DataTypes.TINYINT({ unsigned: true }),
      allowNull: true,
    },
    itemLista: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    codCnae: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // This may need to be a table
    codServico: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    codNBS: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
    discriminacao: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    exigibilidadeISS: {
      // * `1` - Exigível
      // * `2` - Não incidência
      // * `3` - Isenção
      // * `4` - Exportação
      // * `5` - Imunidade
      // * `6` - Exigibilidade Suspensa por Decisão Judicial
      // * `7` - Exigibilidade Suspensa por Processo Administrativo
      type: DataTypes.TINYINT({ unsigned: true }),
      allowNull: false,
    },
    codTributMunicipio: {
      type: DataTypes.INTEGER({ unsigned: true }),
      allowNull: true,
    },
    numProcesso: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    regimeEspTribut: {
      // * `1` – Microempresa Municipal
      // * `2` – Estimativa
      // * `3` – Sociedade de Profissionais
      // * `4` – Cooperativa
      // * `5` – Microempresário Individual (MEI)
      // * `6` – Microempresário e Empresa de Pequeno Porte (ME EPP).
      type: DataTypes.TINYINT({ unsigned: true }),
      allowNull: true,
    },
    optanteSimplesNacional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    incentivoFiscal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // ----- Campos do Tomador:
    identificacaoTomador: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
    nif: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    nomeRazaoTomador: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    logEnd: {
      type: DataTypes.STRING(125),
      allowNull: true,
    },
    numEnd: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    compEnd: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    bairroEnd: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    cidadeEnd: {
      type: DataTypes.INTEGER({ unsigned: true }),
      allowNull: true,
    },
    estadoEnd: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    paisEnd: {
      type: DataTypes.INTEGER({ unsigned: true }),
      allowNull: true,
    },
    cepEnd: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    tel: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // ----- Campos do Intermediário:
    identificacaoIntermed: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
    nomeRazaoIntermed: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    cidadeIntermed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // ----- Campos da Construção Civil:
    codObra: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    art: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    //
    // ----- Campos que não estão na documentação:
    estado: {
      // 0 - pendente,
      // 1 - atrasado,
      // 2 - pago,
      // 3 - substituida,
      // 4 - dados inconsistentes
      type: DataTypes.TINYINT({ unsigned: true }),
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    underscored: false,
    tableName: 'invoice',
    freezeTableName: true,
    timestamps: false,
  });

  invoice.associate = (models) => {
    invoice.belongsTo(models.prefeitura, { targetKey: 'codigoMunicipio', foreignKey: { name: 'prefeituraIncidencia', allowNull: false } });
    invoice.belongsTo(models.empresa, { targetKey: 'enderecoBlockchain', as: 'emissor', foreignKey: { name: 'enderecoEmissor', allowNull: false } });
    invoice.belongsTo(models.block, { targetKey: 'block_id', as: 'block', foreignKey: { name: 'blocoConfirmacaoId', allowNull: true } });
  };

  return invoice;
}
