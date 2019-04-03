// Conta Bancária
export default function (sequelize, DataTypes) {
  const Conta_Bancaria = sequelize.define('Conta_Bancaria', {
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

  Conta_Bancaria.associate = (models) => {
    Conta_Bancaria.belongsTo(models.Banco, { primaryKey: { name: 'banco_id', allowNull: false } });
    Conta_Bancaria.belongsTo(models.User, { primaryKey: { name: 'user_id', allowNull: false } });
  };

  return Conta_Bancaria;
}
