// Imports
import { Sequelize } from 'sequelize';

// App Imports
import env from '../config/env';
import databaseConfig from '../config/database.json';

// Load database config
const databaseConfigEnv = databaseConfig[env];

const opts = {
  define: {
    freezeTableName: true,
  },
};
// Create new database connection
const connection = new Sequelize(
  databaseConfigEnv.database,
  databaseConfigEnv.username,
  databaseConfigEnv.password,
  {
    host: databaseConfigEnv.host,
    dialect: databaseConfigEnv.dialect,
    logging: false,
    operatorsAliases: Sequelize.Op,
    port: databaseConfigEnv.port,
  }, opts,
);

// Create Views for Abe
const views = `
# Replace placeholder table for txout_detail with correct view syntax
# ------------------------------------------------------------

DROP TABLE \`txout_detail\`;

CREATE ALGORITHM=UNDEFINED DEFINER=\`abe\`@\`%\` SQL SECURITY DEFINER VIEW \`txout_detail\`
AS SELECT
   \`cc\`.\`chain_id\` AS \`chain_id\`,
   \`cc\`.\`in_longest\` AS \`in_longest\`,
   \`cc\`.\`block_id\` AS \`block_id\`,
   \`b\`.\`block_hash\` AS \`block_hash\`,
   \`b\`.\`block_height\` AS \`block_height\`,
   \`block_tx\`.\`tx_pos\` AS \`tx_pos\`,
   \`tx\`.\`tx_id\` AS \`tx_id\`,
   \`tx\`.\`tx_hash\` AS \`tx_hash\`,
   \`tx\`.\`tx_lockTime\` AS \`tx_lockTime\`,
   \`tx\`.\`tx_version\` AS \`tx_version\`,
   \`tx\`.\`tx_size\` AS \`tx_size\`,
   \`txout\`.\`txout_id\` AS \`txout_id\`,
   \`txout\`.\`txout_pos\` AS \`txout_pos\`,
   \`txout\`.\`txout_value\` AS \`txout_value\`,
   \`txout\`.\`txout_scriptPubKey\` AS \`txout_scriptPubKey\`,
   \`pubkey\`.\`pubkey_id\` AS \`pubkey_id\`,
   \`pubkey\`.\`pubkey_hash\` AS \`pubkey_hash\`,
   \`pubkey\`.\`pubkey\` AS \`pubkey\`
FROM (((((\`chain_candidate\` \`cc\` join \`block\` \`b\` on((\`cc\`.\`block_id\` = \`b\`.\`block_id\`))) join \`block_tx\` on((\`b\`.\`block_id\` = \`block_tx\`.\`block_id\`))) join \`tx\` on((\`tx\`.\`tx_id\` = \`block_tx\`.\`tx_id\`))) join \`txout\` on((\`tx\`.\`tx_id\` = \`txout\`.\`tx_id\`))) left join \`pubkey\` on((\`txout\`.\`pubkey_id\` = \`pubkey\`.\`pubkey_id\`)));


# Replace placeholder table for chain_summary with correct view syntax
# ------------------------------------------------------------

DROP TABLE \`chain_summary\`;

CREATE ALGORITHM=UNDEFINED DEFINER=\`abe\`@\`%\` SQL SECURITY DEFINER VIEW \`chain_summary\`
AS SELECT
   \`cc\`.\`chain_id\` AS \`chain_id\`,
   \`cc\`.\`in_longest\` AS \`in_longest\`,
   \`b\`.\`block_id\` AS \`block_id\`,
   \`b\`.\`block_hash\` AS \`block_hash\`,
   \`b\`.\`block_version\` AS \`block_version\`,
   \`b\`.\`block_hashMerkleRoot\` AS \`block_hashMerkleRoot\`,
   \`b\`.\`block_nTime\` AS \`block_nTime\`,
   \`b\`.\`block_nBits\` AS \`block_nBits\`,
   \`b\`.\`block_nNonce\` AS \`block_nNonce\`,
   \`cc\`.\`block_height\` AS \`block_height\`,
   \`b\`.\`prev_block_id\` AS \`prev_block_id\`,
   \`prev\`.\`block_hash\` AS \`prev_block_hash\`,
   \`b\`.\`block_chain_work\` AS \`block_chain_work\`,
   \`b\`.\`block_num_tx\` AS \`block_num_tx\`,
   \`b\`.\`block_value_in\` AS \`block_value_in\`,
   \`b\`.\`block_value_out\` AS \`block_value_out\`,
   \`b\`.\`block_total_satoshis\` AS \`block_total_satoshis\`,
   \`b\`.\`block_total_seconds\` AS \`block_total_seconds\`,
   \`b\`.\`block_satoshi_seconds\` AS \`block_satoshi_seconds\`,
   \`b\`.\`block_total_ss\` AS \`block_total_ss\`,
   \`b\`.\`block_ss_destroyed\` AS \`block_ss_destroyed\`
FROM ((\`chain_candidate\` \`cc\` join \`block\` \`b\` on((\`cc\`.\`block_id\` = \`b\`.\`block_id\`))) left join \`block\` \`prev\` on((\`b\`.\`prev_block_id\` = \`prev\`.\`block_id\`)));


# Replace placeholder table for txout_approx with correct view syntax
# ------------------------------------------------------------

DROP TABLE \`txout_approx\`;

CREATE ALGORITHM=UNDEFINED DEFINER=\`abe\`@\`%\` SQL SECURITY DEFINER VIEW \`txout_approx\`
AS SELECT
   \`txout\`.\`txout_id\` AS \`txout_id\`,
   \`txout\`.\`tx_id\` AS \`tx_id\`,
   \`txout\`.\`txout_value\` AS \`txout_approx_value\`
FROM \`txout\`;


# Replace placeholder table for txin_detail with correct view syntax
# ------------------------------------------------------------

DROP TABLE \`txin_detail\`;

CREATE ALGORITHM=UNDEFINED DEFINER=\`abe\`@\`%\` SQL SECURITY DEFINER VIEW \`txin_detail\`
AS SELECT
   \`cc\`.\`chain_id\` AS \`chain_id\`,
   \`cc\`.\`in_longest\` AS \`in_longest\`,
   \`cc\`.\`block_id\` AS \`block_id\`,
   \`b\`.\`block_hash\` AS \`block_hash\`,
   \`b\`.\`block_height\` AS \`block_height\`,
   \`block_tx\`.\`tx_pos\` AS \`tx_pos\`,
   \`tx\`.\`tx_id\` AS \`tx_id\`,
   \`tx\`.\`tx_hash\` AS \`tx_hash\`,
   \`tx\`.\`tx_lockTime\` AS \`tx_lockTime\`,
   \`tx\`.\`tx_version\` AS \`tx_version\`,
   \`tx\`.\`tx_size\` AS \`tx_size\`,
   \`txin\`.\`txin_id\` AS \`txin_id\`,
   \`txin\`.\`txin_pos\` AS \`txin_pos\`,
   \`txin\`.\`txout_id\` AS \`prevout_id\`,
   \`txin\`.\`txin_scriptSig\` AS \`txin_scriptSig\`,
   \`txin\`.\`txin_sequence\` AS \`txin_sequence\`,
   \`prevout\`.\`txout_value\` AS \`txin_value\`,
   \`prevout\`.\`txout_scriptPubKey\` AS \`txin_scriptPubKey\`,
   \`pubkey\`.\`pubkey_id\` AS \`pubkey_id\`,
   \`pubkey\`.\`pubkey_hash\` AS \`pubkey_hash\`,
   \`pubkey\`.\`pubkey\` AS \`pubkey\`
FROM ((((((\`chain_candidate\` \`cc\` join \`block\` \`b\` on((\`cc\`.\`block_id\` = \`b\`.\`block_id\`))) join \`block_tx\` on((\`b\`.\`block_id\` = \`block_tx\`.\`block_id\`))) join \`tx\` on((\`tx\`.\`tx_id\` = \`block_tx\`.\`tx_id\`))) join \`txin\` on((\`tx\`.\`tx_id\` = \`txin\`.\`tx_id\`))) left join \`txout\` \`prevout\` on((\`txin\`.\`txout_id\` = \`prevout\`.\`txout_id\`))) left join \`pubkey\` on((\`prevout\`.\`pubkey_id\` = \`pubkey\`.\`pubkey_id\`)));
`;

// Test connection
console.info('SETUP - Connecting database...');

connection
  .authenticate()
  .then(() => {
    console.info('INFO - Database connected.');
    /* connection.query(views).then(([results, metadata]) => {
      console.info('SUCESS: Created views!');
    }).catch((err) => {
      console.error('ERROR - Unable to create views: ', err);
    }); */
  })
  .catch((err) => {
    console.error('ERROR - Unable to connect to the database:', err);
  });

export default connection;
