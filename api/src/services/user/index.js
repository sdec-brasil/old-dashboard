import ResponseList from '../../utils/response';
import models from '../../models';
import { customErr } from '../../utils';
import passport from '../../setup/passport';


const getUserInfo = async req => new Promise((resolve) => {
  console.log('user', req.user);
  if (req.user) {
    console.log(req.user);
    resolve({ code: 200, data: req.user });
  } else {
    resolve({ code: 500, data: { error: customErr.formatErr({ type: 'userNotFound', message: 'No user came in the request object.' }) } });
  }
});

const patchUserInfo = async req => new Promise(async (resolve) => {
  // const inv = await models.block.findByPk(req.params.id,
  //   {
  //     // include: [
  //     //   {
  //     //     model: models.municipio,
  //     //     include: [
  //     //       models.estado, models.regiao,
  //     //     ],
  //     //   },
  //     // ],
  //   });
  // if (inv) {
  //   resolve({ code: 200, data: inv });
  // } else {
  //   resolve(customErr.NotFoundError);
  // }
  resolve(true);
});

export default {
  getUserInfo,
  patchUserInfo,
};
