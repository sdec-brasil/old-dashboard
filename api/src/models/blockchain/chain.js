export default function (sequelize, DataTypes) {
  const Chain = sequelize.define('Chain', {
    chain_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    chain_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    chain_code3: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    chain_address_version: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    chain_script_addr_vers: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    chain_address_checksum: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    chain_magic: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    chain_policy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    chain_decimals: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    chain_last_block_id: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      references: {
        model: 'block',
        key: 'block_id',
      },
    },
    chain_protocol_version: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'chain',
  });

  Chain.associate = (models) => {
    Chain.belongsTo(models.block, { as: 'chain_last_block', foreignKey: { name: 'chain_last_block_id', allowNull: true } });
  };

  return Chain;
}
