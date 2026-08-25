# API / CLI 参考（0.1.3）

> 完整权威来源：`minds <command> --help`、[Minds Builder Hub](https://build.hellominds.ai/en/docs)、[API Reference](https://build.hellominds.ai/en/docs/api)。

## 安装

```bash
npm install @animocabrands/minds-cli @animocabrands/minds-client-lib
# 或临时运行：npx @animocabrands/minds-cli ...
```

要求 Node 22+。认证读取 `MINDS_BUILDER_API_KEY`（`--builder-api-key` 可覆盖；`.env` 也会被加载）。

## CLI 命令速查

```bash
minds doctor                              # 连通性 / key / 消息连通性
minds list                                # 账号下的 Mind
minds mind show --mind <mindId>           # Mind 详情
minds mind enable|disable --mind <mindId>
minds usage show --mind <mindId> --interval 1w
minds usage by-tool --mind <mindId> --interval day
minds cognition balance --mind <mindId>
minds bazaar search "<query>"             # 公开，无需 key
minds bazaar skills [--search <q>] [--max 200]
minds bazaar apps [--search <q>] [--max 200]
minds mind skills list --mind <mindId>
minds mind apps list --mind <mindId>
minds circle show --mind <mindId>
minds circle add --mind <mindId> --email a@x.com --email b@x.com
minds chat create --mind <mindId> --alias growthmate-main
minds chat list
minds chat show growthmate-main
minds send growthmate-main "Hello" --wait --timeout 180000
minds history growthmate-main --limit 50
minds events growthmate-main --timeout 60000
```

## client-lib 常用方法

```js
import { createMindsClient, BUILDER_API_KEY_ENV } from "@animocabrands/minds-client-lib";

const client = createMindsClient({ builderApiKey: process.env[BUILDER_API_KEY_ENV] });

const minds = await client.listMinds();
const mindId = minds[0]?.mindId;
const detail = await client.getMind(mindId);

await client.ensureConversation("growthmate-main", mindId);
await client.sendMessage({ alias: "growthmate-main", messageText: "你好" });
const rows = await client.getHistory("growthmate-main", { limit: 50 });

const before = await client.getLatestHistoryFingerprint("growthmate-main");
const outcome = await client.waitForReply({
  alias: "growthmate-main",
  timeoutMs: 180_000,
  afterFingerprint: before,
  sentMessageText: "你好",
});
if (!outcome.timedOut) console.log(outcome.reply.messageText);
```

完整方法见 `node_modules/@animocabrands/minds-client-lib/dist/index.d.ts` 或 `lib/minds.mjs`。

## 认证与 API 主机

- 主机：`https://api.build.hellominds.ai`
- 请求头：`X-Api-Key: <Builder API key>`
- 已弃用：`X-Access-Key` / `MINDS_ACCESS_KEY`

## 数据返回约定

- CLI stdout 是干净 JSON（`{ ok: true, … }`）；诊断信息走 stderr。
- `senderType`：`1` = human，`0`（或 `2`）= Mind。
- 分页：`minds history` 用 `--limit 1–200` 与 `--cursor <fingerprint>`。

## 本仓库对 client-lib 的封装

`lib/minds.mjs` 提供：

- `requireBuilderApiKey()`：无 key 时给出可读错误。
- `resolveMindId(client)`：优先 `GROWTHMATE_MIND_ID`，否则取第一个 Mind。
- `ensureConversation(client, mindId)`：幂等绑定稳定别名。
- `sendAndWait(client, alias, text, timeout)`：发送 + 等待回复，超时给出排查命令。

这样 scripts/ 保持薄薄一层，便于替换或扩展。
