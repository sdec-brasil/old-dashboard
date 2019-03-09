// Transferencia
export default (sequelize, DataTypes) => sequelize.define(
  'transferencia',
  {
    id_transferencia: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    tamanho_em_bytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    data_transferencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    input_value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    output_value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    taxa: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'transferencia',
    freezeTableName: true,
  },
);
