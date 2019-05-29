const formatters = Object.create(null);

/**
 * Formats a cpf if it is not formatted, and returns it
 * @param   {String} cpf - An unformatted or formatted cpf
 * @returns {String} A formatted CPF
 */
formatters.CPF = (cpf) => {
  // Check CPF format
  if (/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/.test(cpf)) {
    return cpf;
  }
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
};


/**
 * Formats a CNPJ if it is not formatted, and returns it
 * @param   {String} cnpj - An unformatted or formatted CNPJ
 * @returns {String} A formatted CNPJ
 */
formatters.CNPJ = (cnpj) => {
  // Check CNPJ format
  if (/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}/.test(cnpj)) {
    return false;
  }
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
};

export default formatters;
