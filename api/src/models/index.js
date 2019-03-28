// Imports
import Sequelize from 'sequelize';

// App Imports
import databaseConnection from '../setup/databaseConnection';

const models = {

  // Models following the Abe blockchain-explorer project
  abe_lock: databaseConnection.import('./abe_lock'),
  abe_sequences: databaseConnection.import('./abe_sequences'),
  asset_address: databaseConnection.import('./asset_address'),
  asset_txid: databaseConnection.import('./asset_txid'),
  asset: databaseConnection.import('./asset'),
  block_next: databaseConnection.import('./block_next'),
  block_tx: databaseConnection.import('./block_tx'),
  block_txin: databaseConnection.import('./block_txin'),
  block: databaseConnection.import('./block'),
  chain_candidates: databaseConnection.import('./chain_candidate'),
  chain: databaseConnection.import('./chain'),
  configvar: databaseConnection.import('./configvar'),
  datadir: databaseConnection.import('./datadir'),
  multisig_pubkey: databaseConnection.import('./multisig_pubkey'),
  orphan_block: databaseConnection.import('./orphan_block'),
  pubkey: databaseConnection.import('./pubkey'),
  tx: databaseConnection.import('./tx'),
  txin: databaseConnection.import('./txin'),
  txout: databaseConnection.import('./txout'),
  unlinked_txin: databaseConnection.import('./unlinked_txin'),

  // Specific models for SDEC case of use
  /* Thought: databaseConnection.import('./thought'),
  Bloco: databaseConnection.import('./bloco'),
  Boleto: databaseConnection.import('./boleto'),
  Dados_Bancarios: databaseConnection.import('./dados_bancarios'),
  Empresa: databaseConnection.import('./empresa'),
  Endereco_Blockchain: databaseConnection.import('./endereco_blockchain'),
  Nota_Fiscal: databaseConnection.import('./nota_fiscal'),
  Prefeitura: databaseConnection.import('./prefeitura'),
  Transferencia: databaseConnection.import('./transferencia'), */

};

/* Observacoes importantes
 * (https://github.com/sequelize/issues/2837)) -> motivacao de setar o onDelete: 'CASCADE'
 *
 * Em alguns momentos, usaremos definicoes que aparentam ser redundantes, mas que
 * sao feitas dessa forma para cumprir um papel especifico.
 *
 * Ex: Suponha que temos o modelo Man e o modelo RightArm.
 * As vezes teremos as duas seguintes linhas:
 * Man.hasOne( rightArm );
 * rightArm.belongsTo(Man);
 *
 * Essas linhas alteram o BD da mesma forma, mas se usarmos apenas a primeira, não
 * poderemos usar o ORM para descobrir a qual homem um braço direito pertence.
 *
 * Um caso mais de mundo real que usarei essa "redundancia" é o seguinte, Prefeitura e
 * Dados_Bancarios. A relação óbvia é: Prefeitura.hasOne( Dados_Bancarios ), mas
 * também adicionarei o outro formato: DadosBancarios.belongsTo( Prefeitura ), para
 * poder usar o ORM para obter
 * o dono de uma determinada prefeitura.
 *
 * Para ler mais sobre a motivação por trás desse uso: ( https://stackoverflow.com/questions/34565360/difference-between-hasone-and-belongsto-in-sequelize-orm )
 */


/* Vou deixar essas associations comentadas por motivos historicos. Numa versao inicial do sistema elas foram elaboradas
// Boleto
models.Boleto.hasMany(models.Nota_Fiscal, { foreignKey: 'id_boleto' });
models.Boleto.belongsTo(models.Empresa, { foreignKey: { name: 'cnpj_empresa', allowNull: false }, onDelete: 'CASCADE' });

// Bloco
models.Bloco.hasMany(models.Transferencia, { foreignKey: { name: 'id_bloco', allowNull: false }, onDelete: 'CASCADE' });
models.Bloco.hasMany(models.Nota_Fiscal, { foreignKey: 'id_bloco' });

// Empresa
models.Empresa.belongsTo(models.Transferencia, { foreignKey: { name: 'id_transferencia', allowNull: false, unique: true }, onDelete: 'CASCADE' });
models.Empresa.hasMany(models.Boleto, { foreignKey: 'cnpj_empresa' });
models.Empresa.hasMany(models.Nota_Fiscal, { foreignKey: 'cnpj_empresa' });

// Nota_fiscal
models.Nota_Fiscal.belongsTo(models.Boleto, { foreignKey: 'id_boleto' }); // notas fiscais nao sao deletadas

models.Nota_Fiscal.belongsTo(models.Empresa, { foreignKey: { name: 'cnpj_empresa', allowNull: false }, onDelete: 'CASCADE' });
models.Nota_Fiscal.belongsTo(models.Transferencia, { foreignKey: { name: 'id_nota_fiscal', allowNull: false }, onDelete: 'CASCADE' });
models.Nota_Fiscal.belongsTo(models.Bloco, { foreignKey: { name: 'id_bloco', allowNull: false }, onDelete: 'CASCADE' });
models.Nota_Fiscal.hasOne(models.Nota_Fiscal, { as: 'NotaSubstituida', foreignKey: 'id_nota_substituida' });
models.Nota_Fiscal.belongsTo(models.Prefeitura, { as: 'Municipio', foreignKey: { name: 'cod_prefeitura', allowNull: false }, onDelete: 'CASCADE' });
models.Nota_Fiscal.belongsTo(models.Prefeitura, { as: 'MunicipioPrestacaoServico', foreignKey: { name: 'cod_municipio_prestacao_servico', allowNull: false }, onDelete: 'CASCADE' });
models.Nota_Fiscal.belongsTo(models.Prefeitura, { an: 'MunicipioIncidencia', foreignKey: 'cod_municipio_incidencia' });

// Prefeitura
models.Prefeitura.hasOne(models.Dados_Bancarios, { foreignKey: 'id_prefeitura' }); // To deixando allowNull = true, porque nao sei se no momento de criacao nos vamos ter acesso aos dados bancarios das prefeituras
models.Prefeitura.hasMany(models.Nota_Fiscal, { as: 'Municipio', foreignKey: 'cod_prefeitura' });
models.Prefeitura.hasMany(models.Nota_Fiscal, { as: 'MunicipioPrestacaoServico', foreignKey: 'cod_municipio_prestacao_servico' });
models.Prefeitura.hasMany(models.Nota_Fiscal, { as: 'MunicipioIncidencia', foreignKey: 'cod_municipio_incidencia' });


// transferencia
models.Transferencia.belongsTo(models.Bloco, { foreignKey: 'id_bloco' });
models.Transferencia.belongsTo(models.Endereco_Blockchain, { as: 'EnderecoRemetente', foreignKey: 'endereco_remetente' }); // pode ser NULL
models.Transferencia.belongsTo(models.Endereco_Blockchain, { as: 'EnderecoDestinatario', foreignKey: 'endereco_destinatario' }); // pode ser NULL
models.Transferencia.hasOne(models.Nota_Fiscal, { foreignKey: 'id_nota_fiscal' });


// Dados_bancarios
models.Dados_Bancarios.belongsTo(models.Prefeitura, { foreignKey: 'id_prefeitura' });

// Endereco_blockchain
models.Endereco_Blockchain.hasMany(models.Transferencia, { as: 'EnderecoRemetente', foreignKey: 'endereco_remetente' });
models.Endereco_Blockchain.hasMany(models.Transferencia, { as: 'EnderecoDestinatario', foreignKey: 'endereco_destinatario' });
*/

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
