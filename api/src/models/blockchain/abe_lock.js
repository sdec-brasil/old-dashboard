export default function (sequelize, DataTypes) {
  return sequelize.define('Abe_Lock', {
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
    underscored: true,
    tableName: 'abe_lock',
  });
}
