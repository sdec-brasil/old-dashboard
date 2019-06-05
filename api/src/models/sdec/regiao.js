// Regiao
export default function (sequelize, DataTypes) {
  const regiao = sequelize.define('regiao', {
    nomeRegiao: {
      type: DataTypes.STRING(65),
      allowNull: false,
      primaryKey: true,
    },
  }, {
    underscored: false,
    tableName: 'regiao',
    timestamps: false,
  });

  regiao.associate = (models) => {
    regiao.belongsTo(models.estado, {
      targetKey: 'sigla',
      foreignKey: {
        name: 'uf',
        allowNull: false,
        primaryKey: true,
      },
    });
  };

  return regiao;
}
