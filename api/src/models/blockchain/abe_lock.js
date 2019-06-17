export default function (sequelize, DataTypes) {
  const abeLock = sequelize.define('abe_lock', {
    lock_id: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true,
    },
    pid: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'abe_lock',
    freezeTableName: true,
    timestamps: false,
  });
  return abeLock;
}
