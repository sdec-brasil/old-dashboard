// Prefeitura
export default function (sequelize, DataTypes) {
  const prefeitura = sequelize.define('prefeitura', {
    codigoMunicipio: {
      type: DataTypes.STRING(7),
      primaryKey: true,
      unique: true,
      allowNull: false,
      references: {
        model: 'municipio',
        key: 'codigoIbge',
      },
    },
    cnpj: {
      type: DataTypes.STRING(14),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
  },
  {
    underscored: false,
    tableName: 'prefeitura',
    freezeTableName: true,
    timestamps: false,
  });

  prefeitura.associate = (models) => {
    prefeitura.belongsTo(models.municipio, { foreignKey: { name: 'codigoMunicipio', allowNull: false, unique: true } });
  };

  return prefeitura;
}
