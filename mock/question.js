const Mock = require("mockjs");
const Random = Mock.Random;
const getQuestionList = require("./data/getQuestion");
module.exports = [
  {
    url: "/api/question/:id", // 獲取單個問卷信息
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
        // errno:1001,
        // msg:'錯誤測試'
      };
    },
  },
  {
    // 創建問卷
    url: "/api/question",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
        },
      };
    },
  },
  {
    // 獲取（查詢）問卷列表
    url: "/api/question",
    method: "get",
    response(ctx) {
      // 服務端根據前端傳回的url決定需要傳回的數據
      //   獲取前端輸入的url
      const { url = "", query = {} } = ctx;
      console.log("url:", url);

      const isStar = url.indexOf("isStar=true") >= 0;
      const isDeleted = url.indexOf("isDeleted=true") >= 0;
      console.log(isStar, isDeleted);
      console.log("ctx query", query);
      const pageSize = parseInt(query.pageSize) ||10;
    //   const page = parseInt(query.page);

      return {
        errno: 0,
        data: {
          list: getQuestionList({len:pageSize, isStar, isDeleted }), //當前頁
          total: 100, //總數，用於分頁
        },
      };
    },
  },
];
