const db = require("../models");
const RecordModel = db.record;

class RecordService {
  getRecords() {
    return [];
  }
  get(id) {}
  add(args) {}
  update(record) {}
  delete(id) {}
}

const Record = new RecordService();
module.exports = Record;
