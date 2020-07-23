var sqlMap = {
  adduser: 'INSERT INTO admin_user SET ?  ',
  selectUser: 'SELECT * FROM admin_user WHERE userName = ? AND passWord = ? ',
  userlist: 'SELECT userName,email,id FROM admin_user ',
  delectUser:'DELETE FROM admin_user where id= ?'
}
module.exports = sqlMap;
