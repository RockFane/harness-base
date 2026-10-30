# My App

独立 monorepo：先用 Next.js 开发页面，需要后端时接入 Nest.js 服务，前后端共享类型放在独立包。交付记录用公开包 `deliveryguard@0.5.0` 管理。

## 开始

使用 Node 22.19+（22.x）或 Node 24+，推荐按 `.nvmrc` 使用 Node 22.22.2；包管理器固定为 pnpm 10.34.6。已安装该版本时可跳过 Corepack 准备：

```sh
corepack enable
corepack prepare pnpm@10.34.6 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm harness:status
pnpm dev
```

打开 `http://localhost:3000`。仓库目前只有可运行的骨架：没有业务页面、接口、数据或版本交付记录。

## 项目结构

```text
packages/
  web/        Next.js 页面及 BFF（第一阶段）
  server/     Nest.js 服务（第二阶段）
  contracts/  前后端共享类型与纯函数
docs/
  product/    需求与版本登记入口
  design/     设计与工程说明
.deliveryguard/  版本、验收与修复记录
openspec/changes/ 进行中的规格变更
```

第一阶段用 `pnpm dev` 单独运行 Next.js。第二阶段用 `pnpm dev:full` 同时运行 Next.js（3000）和 Nest.js（3001），通过 Next 的 `/api/server-health` 调用 Nest 的 `/api/health`。首页和健康接口属于工程示例。

构建与检查：`pnpm lint`、`pnpm typecheck`、`pnpm build`、`pnpm test:smoke`、`pnpm check`。启动、端口和包边界见 [monorepo 设计](docs/design/monorepo.md)。

## 开发业务前

按 [交付登记](docs/product/README.md) 登记需求文档与 OpenSpec change，再开始实现。生命周期 `planned → specified → implemented → verified → released` 由 `.deliveryguard/` 记录派生，缺证据就保留 `pending`。

## 待办

- 给仓库和包换成正式名称（当前为 `my-app` 与 `@app/*`）。
- 把 `git remote` 指向自己的仓库：`git remote set-url origin <你的仓库地址>`。
- 登记第一份需求文档与版本记录。
