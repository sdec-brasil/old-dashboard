// Imports
import Sequelize from 'sequelize';

// App Imports
import databaseConnection from '../setup/databaseConnection';

const models = {

  // Models following the Abe blockchain-explorer project
  abe_lock: databaseConnection.import('./abe_lock'),
  abe_sequences: databaseConnection.import('./abe_sequences'),
  asset_address_balance: databaseConnection.import('./asset_address_balance'),
  asset_txid: databaseConnection.import('./asset_txid'),
  asset: databaseConnection.import('./asset'),
  block_next: databaseConnection.import('./block_next'),
  block_tx: databaseConnection.import('./block_tx'),
  block_txin: databaseConnection.import('./block_txin'),
  block: databaseConnection.import('./block'),
  chain_candidate: databaseConnection.import('./chain_candidate'),
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

/* TO-DO
- Sequelize-auto did not create correctly any field from models that are a combination of two or more fields

- Analyse chain_candidate pk. It should be (chain_id, block_id), but the model does not reflect that
- Insert pk on block_next table as a combination of (block_id, block_next_id)
- Insert pk on block_tx as a combination of (block_id, tx_pos) and the combination as unique
- Insert pk on multisig_pubkey as a combination of (multisig_id, pubkey_id)
- Insert pk on txout as a combination of (tx_id, txout_pos)
- Insert unique attribute on txin table as (tx_id, txin_pos)
- Insert pk on block_txin table as a combination of (block_id, txin_id)
- Insert unique attribute on asset_txid table (asset_id, td_ix, txout_pos)

*/

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Associations of block-explorer entities


// block model
models.block.belongsTo(models.block, { as: 'prev_block', foreignKey: { name: 'prev_block_id', allowNull: true } });
models.block.belongsTo(models.block, { as: 'search_block', foreignKey: { name: 'search_block_id', allowNull: true } });

// chain model
models.chain.belongsTo(models.block, { as: 'chain_last_block', foreignKey: { name: 'chain_last_block_id', allowNull: true } });

// chain_candidate model
models.chain_candidate.belongsTo(models.block, { foreignKey: { name: 'block_id', allowNull: false } });

// orphan_block model
models.orphan_block.belongsTo(models.block, { foreignKey: 'block_id' });

// block_next model
models.block_next.belongsTo(models.block, { as: 'next_block', foreignKey: 'next_block_id' });
models.block_next.belongsTo(models.block, { as: 'block', foreignKey: 'block_id' });

// tx model

// block_tx model
models.block_tx.belongsTo(models.block, { foreignKey: 'block_id' });
models.block_tx.belongsTo(models.tx_id, { foreignKey: 'tx_id' });

// pubkey model

// multisig_pubkey
models.multisig_pubkey.belongsTo(models.pubkey, { as: 'multisig_id', foreignKey: { name: 'multisig_id', allowNull: false } });
models.multisig_pubkey.belongsTo(models.pubkey, { as: 'pubkey_id', foreignKey: { name: 'pubkey_id', allowNull: false } });

// txout model
models.txout.belongsTo(models.pubkey, { foreignKey: 'pubkey_id' });

// txin model
models.txin.belongsTo(models.tx, { foreignKey: 'tx_id' });

// unlinked_txin model
models.unlinked_txin.belongsTo(models.txin, { foreingKey: 'txin_id' });

// block_txin model
models.block_txin.belongsTo(models.block, { as: 'block_id', foreignKey: { name: 'block_id', allowNull: false } });
models.block_txin.belongsTo(models.block, { as: 'out_block_id', foreignKey: { name: 'out_block_id', allowNull: false } });
models.block_txin.belongsTo(models.txin, { foreignKey: { name: 'txin_id', allowNull: false } });

// abe-lock model

// asset model
models.asset.belongsTo(models.tx, { foreignKey: { name: 'tx_id', unique: true } });
models.asset.belongsTo(models.chain, { foreignKey: 'chain_id' });

// asset_txid model
models.asset_txid.belongsTo(models.tx, { foreignKey: { name: 'tx_id', allowNull: false } });
models.asset_txid.belongsTo(models.asset, { foreignKey: { name: 'asset_id', allowNull: false } });

// asset_address_balance
models.asset_address_balance.belongsTo(models.asset, { foreignKey: { name: 'asset_id', allowNull: false } });
models.asset_address_balance.belongsTo(models.pubkey, { foreignKey: { name: 'pubkey_id', allowNull: false } });


// End of block-explored define associations //////////////////////////////////////////////////

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
