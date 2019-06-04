const test = (req, res) => res.status(200).json({ data: ['12345'] });
const index = (req, res) => res.status(200).json({ data: [] });

export default {
  test,
  index,
};
