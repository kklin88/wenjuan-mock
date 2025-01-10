const test = require("./test");
const question = require("./question");
const user = require("./user");
const mockList = [...test, ...question,...user];

//現在mockList有全部的page列表
module.exports = mockList;
