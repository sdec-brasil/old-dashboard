// App Imports
import addresses from './addresses';
import balances from './balances';
import blockchain from './blockchain';
import blocks from './blocks';
import clients from './clients';
import invoices from './invoices';
import city from './city';
import transactions from './transactions';
import user from './user';
import users from './users';

const routes = {
  ...addresses,
  ...balances,
  ...blockchain,
  ...blocks,
  ...clients,
  ...invoices,
  ...city,
  ...transactions,
  ...user,
  ...users,
};

export default routes;
