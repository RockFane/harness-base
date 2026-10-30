# Monorepo 工程设计与启动说明

## 目标与边界

同一仓库保存页面、服务与共享合同。先运行 Next.js，需要后端时再启动独立的 Nest.js 服务。工程组织参考 h5-launch-ssr 的 `packages/*` workspace、根命令按包选择和共享包先构建，只使用公开依赖，不含企业网关、SDK、私有 registry 或业务代码。

仓库当前只有基础工程：没有业务页面、接口、数据或版本交付记录。首页与健康检查是工程示例，不证明任何需求已实现。开发业务前先按 [交付登记](../product/README.md) 登记需求文档与 OpenSpec change。

## 包的职责

| 目录 | 职责 | 默认地址 |
| --- | --- | --- |
| `packages/web` | Next.js App Router、页面、服务端 BFF | `http://localhost:3000` |
| `packages/server` | Nest.js 控制器与后续业务服务 | `http://127.0.0.1:3001/api` |
| `packages/contracts` | 共享类型、纯函数；编译生成 JS 与声明 | 无监听端口 |

`contracts` 不依赖 Next/Nest；Web 与 Server 均通过 `workspace:*` 声明依赖。Server 和 Contracts 使用 CommonJS，Web 使用 ES modules。根构建按依赖顺序执行；独立 Web/Server 启动与构建也会先生成共享包，保证首次克隆可用。共享包修改后重新运行 `pnpm --filter @app/contracts build`，或重启对应开发命令。

基础工程采用 pnpm workspace 的依赖排序和包过滤，不额外引入构建缓存层；包和构建规模增长后再评估 Turborepo。

## 第一阶段：只跑前端

在仓库根目录使用 `.nvmrc` 指定的 Node 22.22.2，或根 engines 支持的 Node 版本：

```sh
corepack enable
corepack prepare pnpm@10.34.6 --activate
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm dev` 只启动 Next，首页不请求 Nest，不需要环境文件或凭证。修改页面从 `packages/web/src/app/page.tsx` 开始，共享常量在 `packages/contracts/src/index.ts`。

## 第二阶段：前后端联通

停止第一阶段进程后运行：

```sh
pnpm dev:full
```

两端由同一命令启动，退出时一起停止。也可在两个终端分别运行 `pnpm dev:web` 和 `pnpm dev:server`。

`GET /api/health` 是 Nest 的基础健康示例。浏览器访问 Web 的 `GET /api/server-health`，由 Next 服务端请求 Nest，浏览器不需要跨域配置。上游请求禁用缓存并设 2.5 秒超时，后端未启动、不可达或响应不匹配时返回 503。

`packages/web/.env.example` 提供服务端 `SERVER_API_URL` 示例，默认值即可在本机运行。需要改地址时复制为同目录 `.env.local`，不能改成 `NEXT_PUBLIC_` 配置。Nest 从进程环境读取 `PORT`（默认 3001）和 `HOST`（默认 127.0.0.1），不自动读取 `.env`。初始服务仅绑定本机，没有登录、数据库、支付或业务写入接口。

## 验证和构建后启动

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm test:smoke
pnpm check
```

冒烟检查启动编译后的 Next/Nest，分配临时端口并在结束时停止自己启动的进程，验证 Next 独立运行、两端健康接口联通以及 Nest 停止后返回 503。它证明基础工程连通，不替代业务验收。

单独构建用 `pnpm build:web` 或 `pnpm build:server`。构建后在两个终端运行 `pnpm start:web` 和 `pnpm start:server`。这些命令仅在本机启动，不执行部署或发布。

## 官方依据

- [Next.js 安装与 App Router 约定](https://nextjs.org/docs/app/getting-started/installation)
- [Nest.js 基础工程与启动](https://docs.nestjs.com/first-steps)
- [pnpm workspace 与 workspace 依赖](https://pnpm.io/workspaces)
