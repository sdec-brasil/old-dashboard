// App Imports
import addresses from './addresses';
import balances from './balances';
import blockchain from './blockchain';
import blocks from './blocks';
import clients from './clients';
import invoices from './invoices';
import city from './city';
import transactions from './transactions';
import users from './users';
import companies from './companies';

const routes = {
  ...addresses,
  ...balances,
  ...blockchain,
  ...blocks,
  ...clients,
  ...invoices,
  ...city,
  ...transactions,
  ...users,
  ...companies,
};

export default routes;
