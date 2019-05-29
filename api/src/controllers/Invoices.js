import { InvoiceGet } from '../services/invoices';

const InvoiceController = () => {
  const get = (req, res) => {
    const response = InvoiceGet(req);
    res.status(response.code).send(response.data);
  };

  return {
    get,
  };
};

export default InvoiceController;
