const RestExample = () => {
  const test = (req, res) => res.status(200).send('Ok!');

  return {
    test,
  };
};

export default RestExample;
