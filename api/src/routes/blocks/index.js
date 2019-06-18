export default {
  // Retorna uma lista dos últimos blocos confirmados
  'GET /blocks': {
    path: 'Blocks.get',
  },
  // Pega um bloco pelo block_id
  'GET /blocks/:id': {
    path: 'Blocks.getById',
  },
};
