export default function (sequelize, DataTypes) {
  const datadir = sequelize.define('datadir', {
    datadir_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
      primaryKey: true,
    },
    dirname: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    blkfile_number: {
      type: DataTypes.DECIMAL(8, 0),
      allowNull: true,
    },
    blkfile_offset: {
      type: DataTypes.DECIMAL(20, 0),
      allowNull: true,
    },
    chain_id: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
  }, {
    tableName: 'datadir',
    freezeTableName: true,
    timestamps: false,
  });
  return datadir;
}
