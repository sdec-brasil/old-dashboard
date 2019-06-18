import ResponseList from '../../utils/response';
import models from '../../models';
import { customErr } from '../../utils';
import passport from '../../setup/passport';


const getUserInfo = async req => new Promise(async (resolve) => {
  if (req.user) {
    const userInstance = await models.user.findOne({
      where: {
        id: req.user.id,
      },
      include: [{
        model: models.empresa,
      }],
    });
    if (userInstance !== null) {
      delete userInstance.password;
      resolve({ code: 200, data: userInstance });
    }
  }
  resolve({ code: 500, data: { error: customErr.formatErr({ type: 'userNotFound', message: 'User not found. Make sure you are logged in.' }) } });
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
