// Imports
import Sequelize from 'sequelize';

// App Imports
import databaseConnection from '../setup/databaseConnection';

const models = {
  Thought: databaseConnection.import('./thought'),
  Bloco: databaseConnection.import('./bloco'),
  Boleto: databaseConnection.import('./boleto'),
  Dados_Bancarios: databaseConnection.import('./dados_bancarios'),
  Empresa: databaseConnection.import('./empresa'),
  Endereco_Blockchain: databaseConnection.import('./endereco_blockchain'),
  Nota_Fiscal: databaseConnection.import('./nota_fiscal'),
  Prefeitura: databaseConnection.import('./prefeitura'),
  Transferencia: databaseConnection.import('./transferencia'),
};

// boleto
models.Boleto.hasMany(models.Nota_Fiscal, { foreignKey: 'id_notas', constraints: true });
models.Boleto.hasOne(models.Empresa, { foreignKey: 'cnpj', constraints: true });
/* Tenho que ver como fazer o inverso, porque quando a nota eh criada, ela ainda nao pertence
 a um boleto, somente quando o boleto eh criado, entao nao sei se faz sentido dizer,
   notaFiscal.belongsTo( Boleto , ... ) */

// empresa
models.Empresa.hasOne(models.Transferencia, { foreignKey: 'id_transferencia' });

// nota_fiscal
models.Nota_Fiscal.hasOne(models.Prefeitura, { foreignKey: 'codigo_prefeitura' });
models.Nota_Fiscal.hasOne(models.Empresa, { foreignKey: 'cnpj' });
models.Nota_Fiscal.hasOne(models.Transferencia, { foreignKey: 'id_nota_fiscal' });
models.Nota_Fiscal.hasOne(models.Bloco, { foreignKey: 'id_bloco' });
models.Nota_Fiscal.hasOne(models.Nota_Fiscal, { foreignKey: 'id_nota_substituida' });
//


// prefeitura
models.Prefeitura.hasOne(models.Dados_Bancarios, { foreignKey: 'dados_bancarios' });


// transferencia
models.Transferencia.hasOne(models.Bloco, { foreignKey: 'id_bloco', constraints: true });
models.Transferencia.hasOne(models.Endereco_Blockchain, { foreignKey: 'endereco_remetente' });
models.Transferencia.hasOne(models.Endereco_Blockchain, { foreignKey: 'endereco_destinatario' });


Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
