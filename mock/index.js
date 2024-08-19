const test = require("./test");
const question = require("./question");

const mockList = [...test, ...question];

//現在mockList有全部的page列表
module.exports = mockList;
