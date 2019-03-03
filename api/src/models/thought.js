// Thought
export default (sequelize, DataTypes) => sequelize.define('thoughts', {
  name: {
    type: DataTypes.STRING,
  },
  thought: {
    type: DataTypes.TEXT,
  },
});
