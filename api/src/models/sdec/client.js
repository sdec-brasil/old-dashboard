// Client
export default function (sequelize, DataTypes) {
  const client = sequelize.define('client', {
    id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    trusted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'client',
  });

  return client;
}
