// Dados_bancarios
export default (sequelize, DataTypes) => sequelize.define(
  'dados_bancarios',
  {
    id_dados_bancarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    agencia: {
      type: DataTypes.STRING(7), // tem bancos com 2 digitos de verificacao
      allowNull: false,
    },
    conta: {
      type: DataTypes.STRING(15), // botando uma folga, pois bancos tem tamanhos diferentes
      allowNull: false,
    },
    banco: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'dados_bancarios',
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['agencia', 'conta', 'banco'],
      },
    ],
  },
);
