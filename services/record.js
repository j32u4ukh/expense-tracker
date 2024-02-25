const db = require("../models");
const RecordModel = db.record;

const CATEGORY = {
  1: {
    description: "家居物業",
    // https://fontawesome.com/icons/home?style=solid
    icon: "fa-solid fa-house",
  },
  2: {
    description: "交通出行",
    // https://fontawesome.com/icons/shuttle-van?style=solid
    icon: "fa-solid fa-van-shuttle",
  },
  3: {
    description: "休閒娛樂",
    // https://fontawesome.com/icons/grin-beam?style=solid
    icon: "fa-solid fa-face-grin-beam",
  },
  4: {
    description: "餐飲食品",
    // https://fontawesome.com/icons/utensils?style=solid
    icon: "fa-solid fa-utensils",
  },
  5: {
    description: "其他",
    // https://fontawesome.com/icons/pen?style=solid
    icon: "fa-solid fa-pen",
  },
};

class RecordService {
  getRecords({ userId, categoryId }) {
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
  formatData(record) {
    const date = new Date(record.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    record.date = `${year}-${month}-${day}`;
    record.icon = CATEGORY[record.categoryId].icon;
    return record;
  }
}

const Record = new RecordService();
module.exports = { Record, CATEGORY };
