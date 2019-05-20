import { hello } from '../services/invoices';

const InvoiceController = () => {
  const get = (req, res) => {
    const string = hello();
    res.status(200).send(string);
  };

  return {
    get,
  };
};

export default InvoiceController;
