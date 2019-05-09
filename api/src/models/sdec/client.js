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
    username: {
        // clientID of the FrankHassanabad example
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
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
