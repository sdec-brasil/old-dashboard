import { master } from '../../setup/chainConnection';

async function registerEnterprise(json) {
  const stream = 'events';
  try {
    const address = await master.node.getNewAddress();
    json.endBlock = address;
    const tx = await master.node.grant([address, 'send,receive', 0]);

    setTimeout(async () => {
      try {
        await master.node.publishFrom([address, stream, ['COMPANY_REGISTRY', json.cnpj], { json }]);
        console.log(`Empresa ${address} Registrada com ${tx}`);
      } catch (e) {
        console.log('Error ao registrar empresa:');
        console.error(e);
      }
    }, 30000);
  } catch (e) {
    console.log('Error ao gerar endereço e permitir empresa:');
    console.error(e);
  }
}

export default { registerEnterprise };
