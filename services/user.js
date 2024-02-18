const db = require("../models");
const UserModel = db.user;

class UserService {
  // 新增用戶
  add({ name, email, password }) {
    return new Promise((resolve, reject) => {
      UserModel.create({
        name,
        email,
        password,
      })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // 取得用戶
  get(args) {
    return new Promise((resolve, reject) => {
      let promise;
      if (args.id) {
        promise = UserModel.findByPk(Number(args.id), {
          raw: true,
        });
      } else if (args.name) {
        promise = UserModel.findOne({
          raw: true,
          where: { name: args.name },
        });
      } else {
        promise = UserModel.findOne({
          raw: true,
          where: { email: args.email },
        });
      }
      promise
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // 判斷用戶是否存在
  isExists(args) {
    let where = {};
    if (args.id) {
      where = { id: args.id };
    } else if (args.name) {
      where = { name: args.name };
    } else {
      where = { email: args.email };
    }
    return new Promise((resolve, reject) => {
      UserModel.count({ where })
        .then((count) => {
          resolve(count > 0);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const User = new UserService();
module.exports = User;
