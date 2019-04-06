export default function (sequelize, DataTypes) {
  return sequelize.define('chain', {
    chain_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      primaryKey: true,
    },
    chain_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    chain_code3: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    chain_address_version: {
      type: 'VARBINARY(100)',
      allowNull: false,
    },
    chain_script_addr_vers: {
      type: 'VARBINARY(100)',
      allowNull: true,
    },
    chain_address_checksum: {
      type: 'VARBINARY(100)',
      allowNull: true,
    },
    chain_magic: {
      type: 'BINARY(4)',
      allowNull: true,
    },
    chain_policy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    chain_decimals: {
      type: DataTypes.DECIMAL(2, 0),
      allowNull: true,
    },
    chain_last_block_id: {
      type: DataTypes.DECIMAL(14, 0),
      allowNull: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    chain_protocol_version: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
  }, {
    tableName: 'chain',
    indexes: [
      {
        name: 'x_cc_block',
        fields: ['block_id'],
      },
      {
        name: 'x_cc_chain_block_height',
        fields: ['chain_id', 'block_height'],
      },
      {
        name: 'x_cc_block_height',
        fields: ['block_height'],
      },
    ],
  });
}
