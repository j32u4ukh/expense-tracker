const db = require("../models");
const RecordModel = db.record;

class RecordService {
  getRecords(userId, categoryId) {
    let where = {};
    if (userId && categoryId) {
      where = { userId, categoryId };
    } else if (userId) {
      where = { userId };
    } else if (categoryId) {
      where = { categoryId };
    }
    return new Promise((resolve, reject) => {
      RecordModel.findAll({
        raw: true,
        where,
      })
        .then((records) => {
          resolve(records);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get(id) {
    return new Promise((resolve, reject) => {
      RecordModel.findByPk(id, {
        raw: true,
      })
        .then((record) => {
          if (record) {
            resolve(record);
          } else {
            reject(`不存在 id 為 ${id} 的支出紀錄`);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  add({ name, date, amount, userId, categoryId }) {
    return new Promise((resolve, reject) => {
      RecordModel.create({ name, date, amount, userId, categoryId })
        .then((record) => {
          resolve(record);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  isExists(id) {
    return new Promise((resolve, reject) => {
      RecordModel.count({ where: { id } })
        .then((count) => {
          resolve(count > 0);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  update(record) {
    return new Promise((resolve, reject) => {
      RecordModel.update(
        {
          name: record.name,
          date: record.date,
          amount: record.amount,
          userId: record.userId,
          categoryId: record.categoryId,
        },
        {
          where: { id: record.id },
        }
      )
        .then((record) => {
          resolve(record == 1);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      RecordModel.destroy({ where: { id } })
        .then((number) => {
          resolve(number == 1);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

const Record = new RecordService();
module.exports = Record;
