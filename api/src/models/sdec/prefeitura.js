// Prefeitura
export default function (sequelize, DataTypes) {
  const prefeitura = sequelize.define('prefeitura', {
    codigo_municipio: {
      type: DataTypes.STRING(7),
      primaryKey: true,
      unique: true,
      allowNull: false,
      references: {
        model: 'municipio',
        key: 'codigo_ibge',
      },
    },
  },
  {
    underscored: true,
    tableName: 'prefeitura',
    freezeTableName: true,
    timestamps: false,
  });

  prefeitura.associate = (models) => {
    prefeitura.belongsTo(models.municipio, { foreignKey: { name: 'codigo_municipio', allowNull: false, unique: true } });
  };

  return prefeitura;
}
