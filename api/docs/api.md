### Geral

###### JSON
  - Enviamos e recebemos JSON

###### Tipos
  - Tipos bem definidos para data, tempo e outros valores
  - Data:  RFC 3339, section 5.6
  - DataHora: RFC 3339, section 5.6
  - Hora: ISO8601 Extended Format, em UTC
  - Reais: Todos os valores da API serão sempre inteiros, representados em centavos de reais, R$1 = 100.



###### Resposta bem sucedida
  - Todo dado vai ser encapsulado dentro de um objeto que contém metainformações sobre a query

```
{
  meta: {
    ... URL, parâmetros, header etc
  }
  cursor: {
    ... referente à paginação e navegação
    until: DateTime
    offset: Number
    limit: Number
    next: URL || null
    before: URL || null
  }
  err: {
    ... err se houver
    "type": "srn:error:target_account_not_found",
    "errors": [
        {
            "error": "is invalid",
            "path": [
                "tax_id"
            ]
        }
    ],
  }
  data: {
    ... resultado efetivo da query
  }
}
```

###### KISS: 
  - Keep it Simple, Stupid:
    - Códigos HTTP's são lindos, mas não precisamos retornar todas as 999 opções.
    - +++ 

##### Invoices (Nota Fiscal) 
  - GET /invoices - Retorna uma lista das últimas notas fiscais emitidas 
    - Path Pamaters:
      - /invoices?from=ent       | String, Retorna lista das notas fiscais que foram emitidas pela entidade (CPF || CNPJ || GUID || Address)
      - /invoices?town=ent       | String, Retorna lista das notas fiscais emitidas para a prefeitura entidade (CPNJ || IBGE)
      - /invoices?sort=srt       | Enum, Retorna lista das notas fiscais ordenadas pelo srt (valor ou data)
      - /invoices?expired=d      | Date, Retorna lista das notas fiscais que estavam expiradas na data N < NOW
      - /invoices?expiring=d     | Date, Retorna lista das notas fiscais que irão expirar em NOW e N, N > NOW
      - /invoices?block=e        | Enum [Int Altura, String TxID], Retorna lista das notas fiscais emitidas no bloco e
      - /invoices?since=d        | Date, Obrigatório, Retorna lista das notas fiscais emitidas anterior à N
      - /invoices?offset=k       | Integer, Obrigatório, Retorna lista das notas fiscais pulando as N primeiros entradas
      - /invoices?emissao_from=d | Date, Retorna lista das notas fiscais com data de emissão > emissão_from
      - /invoices?emissão_to=d   | Date, Retorna lista das notas fiscais com data de emissão < emissão_to
  - POST * /invoices - Emite uma nota fiscal (* necessita autenticação)
  - GET /invoices/txid - Retorna a nota fiscal com o txid 
  - POST * /invoices/:txid - Altera a nota fiscal com txid, reemitindo uma nova.
  - POST /invoices/search
  - GET /invoices/search/:id

##### Users (Usuário que emitiu nota fiscal) 
  - GET * /user - Retorna informações do usuário autenticado
  - GET /users - Retorna informações públicas dos usuários do sistema (o próprio Registry)
  - POST /users - Submete informações para criação de um novo usuário e registra na Blockchain
  - GET /users/:ent - Retorna informações sobre um usuário, onde ent pode ser Endereço Público || CPF || GUID || CNPJ (contem o registry)

##### Clients ( Aplicação de 3o utilizando o sistema)
  - GET * /client - Retorna informações sobre o cliente logado.
  - POST /clients - Registra um novo client no banco.
  - PATCH * /clients/:id - Altera informações de um client. Cada client só pode alterar suas próprias informações.
  - DELETE * /clients/:id - Deleta um client. Cada client só pode deletar seu próprio registro. 
  
##### Blocks ( Um bloco da nossa rede) 
  - GET /blocks - Retorna uma lista com os últimos blocos
  - GET /blocks/:id - Retorna informações sobre o block id = [Altura || TxID]

##### CBlockchain (Informações gerais da rede)
  - GET /blockchain - Retorna informações gerais sobre o estado da Blockchain
  
##### CWallet/Address (Endereço da blockchain) 
  - GET /addresses - Retorna informações gerais sobre os endereços públicos da rede
  - GET /addresses/:addr - Retorna informações gerais sobre um endereço específico da rede

##### CTowns ( Prefeitura Cadastrada no Sistema)
  - GET /towns - Retorna informações das prefeituras do sistema.
  - GET /towns/:id - Retorna informações sobre uma prefeitura, onde id pode ser o GUID || Código do município IBGE || CNPJ 
  /towns/{id}/financial/pending 
/towns/{id}/financial/overdue

##### CBalance (saldo de um endereço)
  - GET /balances - Retorna lista de saldos e endereços públicos
  - GET /balances/:ent - Retorna o saldo de uma entidade = GUID || Endereço Publico || CNPJ || CPF

##### CTransaction ( Transação na Blockchain: pode ser multiplas coisas)      
  - GET /transactions - Retorna lista das últimas transações da rede e suas classificações
  - GET /transactions/:ent  - Retorna uma lista das transações de uma entidade = GUID || CNPJ || CPF || Endereço Público