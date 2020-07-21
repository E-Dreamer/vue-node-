var sqlMap = {
  adduser: 'INSERT INTO admin_user SET ?  ',
  selectUser: 'SELECT * FROM admin_user WHERE userName = ? AND passWord = ? ',
  userlist: 'SELECT userName,email FROM admin_user'
}
module.exports = sqlMap;
