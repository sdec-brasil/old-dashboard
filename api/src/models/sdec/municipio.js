// Nota_Pagamento
export default function (sequelize, DataTypes) {
  const municipio = sequelize.define('municipio', {
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
    timestamps: false,
  });

  municipio.associate = (models) => {
    municipio.belongsTo(models.estado, { foreignKey: { name: 'sigla', allowNull: false } });
  };

  return municipio;
}
