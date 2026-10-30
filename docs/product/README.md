# 交付登记

本目录登记项目的需求文档与版本范围。需求正文不在仓库里复制一份，避免两处规则不同步；这里只维护入口与登记状态。

## 当前状态

未登记任何需求文档、版本、OpenSpec change、验收证据或发布记录。`.deliveryguard/versions/` 为空，`openspec/changes/` 为空，因此首页与健康检查都只是工程示例。

## 开始开发业务前

1. 写需求文档（Markdown、Wiki 或在线文档均可），把标题与真实链接登记到版本记录：`.deliveryguard/versions/<version>.json`，其中一份标记 `"primary": true`。
2. 建一个 OpenSpec change：`openspec/changes/<change-id>/proposal.md` 与 `tasks.md`，并在版本记录的 `openSpec` 字段关联。配置里 `requireOpenSpec` 为 `true`。
3. 运行 `pnpm check` 校验登记结构，`pnpm harness:status` 查看派生生命周期。

生命周期 `planned → specified → implemented → verified → released` 由记录派生，不手工改写。规格、代码、测试、验收和发布各自的证据相互独立，缺哪一层就留 `pending`。

## 配套资料

- [Monorepo 工程设计与启动说明](../design/monorepo.md)
- [DeliveryGuard 配置](../../deliveryguard.config.json)
- 各层记录格式见 `node_modules/deliveryguard/schemas/`：`version`、`evidence`、`repair-case`、`config`。
