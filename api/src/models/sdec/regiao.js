// Regiao
export default function (sequelize, DataTypes) {
  const regiao = sequelize.define('regiao', {
    regiao_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(65),
      allowNull: false,
    },
  }, {
    underscored: true,
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