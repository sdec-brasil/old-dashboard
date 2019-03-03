// Dados_bancarios
export default (sequelize, DataTypes) => {
  return sequelize.define("dados_bancarios", {
    id_dados_bancarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    agencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    conta: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    banco: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    /* Com esse modelo existe uma questao.
       1 - Como garantir a unicidade dos campos agencia + conta + banco ?
       2 - Daria pra criar um campo que eh obtido pela concatenacao dos 3 e declarar ele como unico
       3 - Outra solucao eh fazer um indice incremental inteiro, e quando novos dados vao ser inseridos
           na tabela, a gente roda um procedure pra checar se eles ja nao foram inseridos antes

       Coloquei a solucao descrita no item 3, mas ainda nao parei pra pensar em como fazer os procedures
       Talvez seja melhor colocar os dados concatenados, so nao achei que ia ficar muito elegante esse campo.
    */
  });
};
