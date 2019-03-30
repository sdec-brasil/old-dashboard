module.exports = function (sequelize, DataTypes) {
  return sequelize.define('datadir', {
    datadir_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    dirname: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    blkfile_number: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    blkfile_offset: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    chain_id: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  }, {
    underscored: true,
    tableName: 'datadir',
  });
};
