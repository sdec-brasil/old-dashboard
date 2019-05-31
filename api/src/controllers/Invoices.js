import { InvoiceGet } from '../services/invoices';

const InvoiceController = () => {
  const get = async (req, res) => {
    const response = await InvoiceGet(req);
    res.status(response.code).send(response.data);
  };

  return {
    get,
  };
};

export default InvoiceController;
