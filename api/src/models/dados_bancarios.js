// Dados_bancarios
export default (sequelize, DataTypes) => sequelize.define('dados_bancarios', {
  id_dados_bancarios: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  agencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  banco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['agencia', 'conta', 'banco'],
    },
  ],
});
