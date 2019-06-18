export default {
  // Retorna uma lista das últimas notas fiscais emitidas
  'GET /blocks': {
    path: 'Blocks.get',
  },
  // Pega nota fiscal pelo txid
  'GET /blocks/:id': {
    path: 'Blocks.getById',
  },
};
