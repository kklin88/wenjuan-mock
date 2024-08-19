const Mock = require("mockjs");
// require - common-js
// 在nodejs中默認使用common-js  .js
const Random = Mock.Random
module.exports = [
  {
    url: "/api/test",
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          name: Random.cname(),
        },
      };
    },
  },
];


