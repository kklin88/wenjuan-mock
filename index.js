const Koa = require("koa");
const Router = require("koa-router");
const mockList = require("./mock/index");

const app = new Koa();
const router = new Router();
// 註冊mock路由

async function getRes(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn();
      resolve(res)
    },1000);
  });
}
mockList.forEach((item) => {
  const { url, method, response } = item;
  router[method](url, async (ctx) => {
    const res = await getRes(response);//模擬網絡請求的加載狀態
    ctx.body = res;
  });
  //   router.get
});
app.use(router.routes());
app.listen(3001); //port
