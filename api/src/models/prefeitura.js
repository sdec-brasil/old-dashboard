// Prefeitura
export default (sequelize, DataTypes) => {
  return sequelize.define("prefeitura", {
    codigo_municipio: {
      type: DataTypes.Integer,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    conta_bancaria: {
      type: DataTypes.Integer,
      unique: true,
      allowNull: false
      // Precisamos averiguar como conectar esse campo dessa tabela com a chave primaria
      // da tabela dados_bancarios
      // o comando vai ser algo do tipo Prefeitura.hasOne(Dados_Bancarios)
    }
  });
};
