// Prefeitura
export default function (sequelize, DataTypes) {
  const Prefeitura = sequelize.define('Prefeitura', {
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
  });

  Prefeitura.associate = (models) => {
    Prefeitura.belongsTo(models.Municipio, { foreignKey: { name: 'codigo_municipio', allowNull: false, unique: true } });
  };
}
