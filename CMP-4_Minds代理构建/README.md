# 涨粉参谋 GrowthMate — Minds 常驻代理

> Creative Minds Jam #1（香港）· DoraHacks ·「涨粉与互动」赛道
> 一句话定位：**把创作者「每天要回、但没时间回」的粉丝关系，交给一个记得住、会自动做的常驻 Minds 代理。**

本仓库是可运行、可演示的 Minds Builder API/CLI 工程：把 GrowthMate 的「**记忆 / 连续性 / 自主跟进**」三类行为，落成 Minds 原生的 Skill（Registry Offering + App Manifest + Tool Schemas + Skill Playbook），并附带自动化构建、运行与验证脚本。

---

## 1. 三类行为如何落地

| 评审关键词 | GrowthMate 行为 | Minds 原生能力 | 本仓库入口 |
|---|---|---|---|
| 记忆 | 记住谁评论过什么、偏好、承诺 | Episodes / Tenets 分层长期记忆 | `prompts/10-memory-skill.md` + `npm run memory` |
| 连续性 | 回复时引用昨天/上周的互动，区分新粉/熟粉/待转化 | 跨会话召回 + 关系画像 | `prompts/20-continuity-skill.md` + `npm run followup` |
| 自主跟进 | 不等指令，每天自动生成增长简报并主动推送 | Passive Autonomous Mode + Telegram + HTTP_Execute | `prompts/30-autonomous-followup-skill.md` + `npm run briefing` |

> 三个 Skill 共用同一套粉丝画像与 Tenets：`00-persona.md` 先写入 Soul 的 Tenets（人设、语气、边界），后续所有技能共享。

---

## 2. 架构

```
┌────────────────────────── 创作者 ──────────────────────────┐
│  Telegram / Builder 对话                                     │
└───────────────┬──────────────────────────────────────────────┘
                │ 对话、主动推送
┌───────────────▼──────────────────────────────────────────────┐
│                      GrowthMate（Minds 常驻代理）              │
│                                                               │
│  00-persona        Tenets：人设 · 语气 · 边界                │
│  10-memory         Episodes：每条粉丝互动 · Tenets：粉丝画像 │
│  20-continuity     新粉 / 熟粉 / 待转化 · 连续性评分          │
│  30-autonomous     每日增长简报 · 待跟进名单 · 回复草稿       │
│                                                               │
│  工具：Telegram（主动消息）· HTTP_Execute（可选数据源/TTS）   │
└───────────────────────────────────────────────────────────────┘
```

- **记忆层分工**：`Episodes` 存「什么时候发生了什么」，`Tenets` 存「长期人设、粉丝特征、运营规则」。
- **信任边界**：所有对外回复默认进入「待确认草稿」；只做已授权动作。

---

## 3. 目录结构

```
.
├── README.md                      # 本文件
├── package.json                   # npm 脚本入口
├── .env.example                   # 环境变量模板
├── prompts/                       # Minds 原生「描述→精修→构建」剧本
│   ├── 00-persona.md              # 人设 + Tenets
│   ├── 10-memory-skill.md         # 记忆 Skill
│   ├── 20-continuity-skill.md     # 连续性 Skill
│   ├── 30-autonomous-followup-skill.md  # 自主跟进 Skill
│   ├── 40-refine.md / 50-build.md / 60-inspect.md
│   └── 90/91/92-run-*.md          # 运行 / 验证提示词
├── lib/
│   ├── minds.mjs                  # Minds client-lib 封装
│   └── prompts.mjs                # 提示词加载 + 插值
├── scripts/
│   ├── onboard.mjs                # 写入人设
│   ├── build-skills.mjs           # 顺序构建三个 Skill
│   ├── memory.mjs / briefing.mjs / followup.mjs
│   └── demo.mjs                   # 端到端冒烟演示
└── docs/
    ├── architecture.md
    ├── minds-integration.md
    ├── prompt-playbook.md
    ├── demo-runbook.md
    ├── tts-decision.md
    └── api-cli-reference.md
```

---

## 4. 快速开始

### 4.1 前置条件

1. 已在 [hellominds.ai](https://hellominds.ai) 注册，并创建至少一个 Mind。
2. 在 Builder console 创建 Builder API key（仅显示一次，请保存）。
3. Node.js 22+（本机开发已用 Node 24 验证）。

### 4.2 安装与配置

```bash
cd CMP-4_Minds代理构建
npm install
cp .env.example .env
# 编辑 .env，填入 MINDS_BUILDER_API_KEY，必要时填 GROWTHMATE_MIND_ID 与创作者人设
```

### 4.3 验证连接

```bash
npm run doctor      # 检查 api.build 连通性、key、消息连通性
npm run list        # 列出账号下的 Mind
npm run show -- <mind-uuid>   # 查看某个 Mind 详情（如钱包/链/邮箱）
```

### 4.4 构建 GrowthMate

```bash
npm run onboard     # 写入创作者人设与 Tenets
npm run build       # 依次构建 记忆 → 连续性 → 自主跟进 三个 Skill
npm run build:inspect   # 同 build，并在结尾附加权限检查
```

### 4.5 运行与验证

```bash
npm run memory -- "@kiki 在最新视频下评论：上期那个汤底配方能出个详细版吗？"
npm run memory      # 不带参数 = 查询：昨天谁最活跃？我答应过谁什么？
npm run followup    # 生成 3 位最值得跟进的粉丝的「待确认草稿」
npm run briefing    # 运行每日增长简报
npm run demo        # 端到端冒烟演示
```

### 4.6 查看对话历史

```bash
npm run history
# 或带更多参数：
npx minds history growthmate-main --limit 50
```

---

## 5. 演示脚本对应（CMP-5 视频主线）

| 视频场景 | 对应行为 | 执行命令 |
|---|---|---|
| 接入 Minds | 写入人设 / Tenets | `npm run onboard` |
| 连续（记住昨日互动） | 记忆 + 连续性 | `npm run memory -- "<评论>"` → `npm run memory` |
| 自主（每日增长简报） | 自主跟进 | `npm run briefing` |
| 记忆（用创作者语气回复） | 连续性草稿（仅文字） | `npm run followup`；声线决策见 `docs/tts-decision.md` |

---

## 6. 评审三要素对齐

- **Problem Fit**：直接对应创作者「记不住粉丝 / 没人帮复盘 / 回复难规模化」三个痛点，每个 Skill 都回扣真实运营信号。
- **Innovation**：把 Minds 的长期记忆 + 主动运行，升级为「关系经营的连续性」，而非另一个套话聊天机器人。
- **Feasibility**：原生能力覆盖记忆、连续性、自主跟进；声线为关键风险项，已确认演示用「仅文字草稿」（见 `docs/tts-decision.md`）。

---

## 7. 当前状态与下一步

- ✅ 已在真实 Minds 账号构建完成：独立 Mind `GrowthMate.Advisor.Lin`（`8099503e-f36b-1410-8466-00039ce7df11`），三个 Skill 已装备并 dry-run 验证（见 `docs/live-verification.md`）。
- ✅ Telegram 已接入，`briefing` 可主动推送。
- 已确认：声线采用「仅文字草稿」。
- 可选增强：平台数据源、cognition 充值、简报参数确认；详见 `docs/live-verification.md`。
- 已发布：仓库 `https://github.com/rectinajh/growthmate-minds`。

详细说明：`docs/minds-integration.md`、`docs/prompt-playbook.md`、`docs/demo-runbook.md`、`docs/live-verification.md`。
