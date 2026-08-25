# Minds 平台集成映射

以下映射来自 Minds Builder Hub 官方文档（build.hellominds.ai）与 `@animocabrands/minds-client-lib` / `@animocabrands/minds-cli` 0.1.3 的实测能力。

## 概念映射

| GrowthMate 需求 | Minds 概念 | 说明 |
|---|---|---|
| 常驻代理 | Mind | always-on agent，拥有 identity、长期记忆、platform wallet |
| 人设 / 语气 / 边界 | Soul 的 Tenets | 跨会话长期生效 |
| 记住粉丝互动 | Episodes | 过去会话 / 事件，可跨会话召回 |
| 粉丝画像 / 运营规则 | Tenets | 长期事实与规则 |
| 主动简报 | Passive Autonomous Mode | 定时、发送定时更新、运行触发式工作流 |
| Telegram 主动消息 | Telegram 集成 | 内置工具连接 |
| 平台数据 / TTS | HTTP_Execute | 调用任意公开 REST 端点 |
| 多个 Mind 协作 / 失败自愈 | Internal Channels / Brain Pulse | 供未来扩展 |

## CLI / API 能力清单（实测）

认证：`X-Api-Key`，环境变量 `MINDS_BUILDER_API_KEY`（`X-Access-Key` 已弃用）。

| 操作 | CLI | client-lib |
|---|---|---|
| 检查连通 | `minds doctor` | `createMindsClient()` 后调用方法验证 |
| 列出 Mind | `minds list` | `client.listMinds()` |
| Mind 详情 | `minds mind show --mind <id>` | `client.getMind(id)` |
| 启用/停用 | `minds mind enable/disable` | `client.updateMindStatus(id, {isEnabled})` |
| 认知用量 | `minds usage show/by-tool` | `client.getCognitionUsage/getCognitionUsageByTool` |
| 认知余额 | `minds cognition balance` | `client.getCognitionBalance(id)` |
| Circle | `minds circle show/list/add/remove` | `client.getCircle/addCircleMembers/removeCircleMembers` |
| Bazaar | `minds bazaar search/skills/apps` | `client.bazaar.*`（公开，无需 key） |
| 装备技能/应用 | `minds mind skills/apps` | `client.equipSkills/equipApps` |
| 对话 | `minds chat list/show/create` | `client.ensureConversation` |
| 发消息 | `minds send <alias> <text> --wait` | `client.sendMessage` |
| 历史 | `minds history <alias>` | `client.getHistory` |
| 等待回复 | `minds send --wait` | `client.waitForReply` |
| 事件流 | `minds events` | `client.subscribeEvents/eventsIterator` |

## 构建 GrowthMate 的 Minds 原生方式

Minds 官方建议「**Describe it to your Mind, and your Mind builds it**」：向 Mind 描述技能 → 精修 → 确认构建。Mind 会产出 Registry Offering、App Manifest、Tool Schemas、Skill Playbook 四件套。本仓库的 `prompts/` 即这套描述剧本，`scripts/build-skills.mjs` 将其顺序发送。

## 需在 hellominds.ai 控制台手动完成的步骤

1. 创建 Mind。
2. 创建 Builder API key（仅显示一次）。
3. （演示需要主动推送时）在 Mind 详情页配置 Telegram 集成。
4. （需要平台真实数据时）配置对应平台 Connection / 授权。

## 风险与阻塞

- **TTS 无内置能力**：Minds 无原生语音合成，需 `HTTP_Execute` 接第三方 TTS，或演示用预录声线降级（见 `tts-decision.md`）。
- **平台数据源**：新增粉丝 / 互动量需要对应平台的公开/授权 API；无法获取时简报必须诚实标注「待接数据源」。
- **Circle 仅支持人类邮箱**：Mind-to-mind circle 不支持（不影响本产品 MVP）。
