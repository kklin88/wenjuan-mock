const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors"); // <- 用koa專用的cors
const mockList = require("./mock/index");

const app = new Koa();
app.use(cors()); // <- 這裡不用變

const router = new Router();

async function getRes(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 1000);
  });
}

mockList.forEach((item) => {
  const { url, method, response } = item;
  router[method](url, async (ctx) => {
    const res = await getRes(response, ctx);
    ctx.body = res;
  });
});

app.use(router.routes());

// 這裡改成監聽 Render 給的PORT環境變數，沒的話就3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
