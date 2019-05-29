const routes = {
  /**
   * @swagger
   * /invoices:
   *  get:
   *    summary: Retorna uma lista das últimas notas fiscais emitidas
   *    security: []
   *    tags: [Public Data]
   *    description: >-
   *      Retorna uma lista das últimas notas fiscais emitidas.
   *    parameters:
   *      - name: town
   *        in: query
   *        required: false
   *        description: Filtrar por notas ficais emitidas para a prefeitura entidade (CNPJ || IBGE)
   *        schema:
   *          type: array
   *          items:
   *            type: string
   *        style: form
   *        explode: false
   *      - $ref: '#/components/parameters/EntParam'
   *      - $ref: '#/components/parameters/EntToParam'
   *      - $ref: '#/components/parameters/untilParam'
   *      - $ref: '#/components/parameters/offsetParam'
   *      - $ref: '#/components/parameters/limitParam'
   *    responses:
   *      '200':
   *        description: OK
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Invoice'
   */
  'GET /invoices': 'Invoices.get',
};

export default routes;
