/**
 * @description 生成問卷列表
 *
 */
const Mock = require("mockjs");
const Random = Mock.Random;

function getQuestionList(opt = {}) {
  const { len = 10, isStar = false, isDeleted = false } = opt;
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar,//標星屬性
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted,//假刪除
    });
  }
  return list;
}
module.exports = getQuestionList;
