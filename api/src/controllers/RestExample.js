const RestExample = () => {
  const test = (req, res) => res.status(200).send('Hello World, Deploy!');

  return {
    test,
  };
};

export default RestExample;
