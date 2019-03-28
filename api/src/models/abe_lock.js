module.exports = function (sequelize, DataTypes) {
  return sequelize.define('abe_lock', {
    lock_id: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true,
    },
    pid: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'abe_lock',
  });
};
