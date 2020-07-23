import {
    MessageBox
} from 'element-ui';
import {
    Message
} from 'element-ui';
const confirm = MessageBox.confirm

function Urlparams(obj) {
  const params = new URLSearchParams();

  for (let key in obj) {

    if (obj[key] != undefined && obj[key] != null) {
      params.append(key, obj[key]);
    }

  }

  return params
}

function Confirm(type, contentText) {
  return new Promise((resolve, reject) => {
    confirm(contentText, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type
    }).then(() => {
      resolve();
    }).catch(() => {
      reject()
    });
  })
}
export default {
  Urlparams,
  Confirm
}
