// Conta Bancária
export default function (sequelize, DataTypes) {
  const conta_bancaria = sequelize.define('conta_bancaria', {
    banco_id: {
      type: DataTypes.STRING(),
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'banco',
        key: 'banco_id',
      },
    },
    agencia: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    conta: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'conta_bancaria',
    indexes:
    [
      {
        unique: true,
        fields: ['banco_id', 'agencia', 'conta'],
        allowNull: false,
      },
    ],
  });

  conta_bancaria.associate = (models) => {
    conta_bancaria.belongsTo(models.banco, { primaryKey: { name: 'banco_id', allowNull: false } });
    conta_bancaria.belongsTo(models.user, { primaryKey: { name: 'user_id', allowNull: false } });
  };

  return conta_bancaria;
}
