// App Imports
import addresses from './addresses';
import balances from './balances';
import blockchain from './blockchain';
import blocks from './blocks';
import clients from './clients';
import invoices from './invoices';
import towns from './towns';
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
  ...towns,
  ...transactions,
  ...user,
  ...users,
};

export default routes;
