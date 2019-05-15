const test = (req, res) => res.status(200).send('Hello World, Deploy!');
const index = (req, res) => res.status(200).send('Home');

export default {
  test,
  index,
};
