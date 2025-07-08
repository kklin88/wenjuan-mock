const Mock = require("mockjs");
const Random = Mock.Random;
const getQuestionList = require("./data/getQuestionList");
module.exports = [
  {
    url: "/api/question/:id", // 獲取單個問卷信息
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),//問卷的標題
          // 組件列表 問卷包含的組件列表
          componentList: [
            //Title
            {
              fe_id: Random.id(),
              type: "questionTitle", //組件類型，不能重複，前後端統一好   <a>
              title: "問卷標題",
              isHidden: false,
              isLocked: false,
              props: {
                text: "個人信息調研",
                level: 1,
                isCenter: false,
              },
            }, //組件類型，不能重複，前後端需一致
            // Input
            {
              fe_id: Random.id(),
              type: "questionInput",
              title: "輸入框1",
              isHidden: false,
              isLocked: false,
              props: {
                title: "你的姓名",
                placeholder: "請輸入姓名...",
              },
            },
            // Input
            {
              fe_id: Random.id(),
              type: "questionInput",
              title: "輸入框2",
              isHidden: false,
              isLocked: false,
              props: {
                title: "你的電話",
                placeholder: "請輸入電話...",
              },
            },
          ],
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
      const pageSize = parseInt(query.pageSize) || 10;
      //   const page = parseInt(query.page);

      return {
        errno: 0,
        data: {
          list: getQuestionList({ len: pageSize, isStar, isDeleted }), //當前頁
          total: 100, //總數，用於分頁
        },
      };
    },
  },
  {
    //更新問卷
    url: "/api/question/:id",
    method: "patch",
    response() {
      return { errno: 0 };
    },
  },
  {
    // 複製問卷
    url: "/api/question/duplicate/:id",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    // 批量徹底刪除
    url: "/api/question",
    method: "delete",
    response() {
      return {
        errno: 0,
      };
    },
  },
];
