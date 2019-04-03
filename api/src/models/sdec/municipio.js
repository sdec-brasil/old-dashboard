// Nota_Pagamento
export default function (sequelize, DataTypes) {
  const Municipio = sequelize.define('Municipio', {
    codigo_ibge: {
      type: DataTypes.STRING(7),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
  },
  {
    underscored: true,
    tableName: 'municipio',
    freezeTableName: true,
  });

  Municipio.associate = (models) => {
    Municipio.belongsTo(models.Estado, { primaryKey: { name: 'sigla', allowNull: false } });
  };

  return Municipio;
}
