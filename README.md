# 涨粉参谋 GrowthMate — 常驻 Minds 增长代理

> Creative Minds Jam #1（香港）· DoraHacks ·「涨粉与互动」赛道
> 一句话定位：**把创作者「每天要回、但没时间回」的粉丝关系，交给一个记得住、会自动做、有创作者声音的常驻 Minds 代理。**

**代码仓库**：<https://github.com/rectinajh/growthmate-minds>


GrowthMate 不是定时发帖器，也不是套话聊天机器人。它利用 Minds 的**长期记忆（Episodes / Tenets）**与**自主运行（Passive Autonomous Mode）**，落地三类行为：**记忆**、**连续性**、**自主跟进**。

---

## 交付物总览

| 模块 | 内容 | 入口 |
|---|---|---|
| 产品定义与演示脚本 | 痛点、功能、2 分钟脚本、评审三要素 | [`涨粉参谋-产品定位与演示脚本.md`](涨粉参谋-产品定位与演示脚本.md) |
| Minds 代理工程 | 可运行/可验证的 Builder API/CLI 工程 | [`CMP-4_Minds代理构建/README.md`](CMP-4_Minds代理构建/README.md) |
| 技术文档 | 架构、Minds 集成映射、Prompt Playbook、验证记录 | [`CMP-4_Minds代理构建/docs/`](CMP-4_Minds代理构建/docs/) |
| 演示视频与视觉 | 提交版 MP4、动画源、关键视觉、音频字幕 | [`CMP-5_演示视频/README.md`](CMP-5_演示视频/README.md) |
| DoraHacks 提交材料 | 提交字段、链接汇总、最终提交 checklist | [`SUBMISSION.md`](SUBMISSION.md) |

---

## 三类行为如何落地

| 评审关键词 | GrowthMate 行为 | Minds 原生能力 | 工程入口 |
|---|---|---|---|
| 记忆 | 记住谁评论过什么、偏好、承诺 | Episodes / Tenets 分层长期记忆 | `npm run memory` + `prompts/10-memory-skill.md` |
| 连续性 | 回复时引用昨日互动，区分新粉/熟粉/待转化 | 跨会话召回 + 关系画像 | `npm run followup` + `prompts/20-continuity-skill.md` |
| 自主跟进 | 不等指令，每天自动生成增长简报并主动推送 | Passive Autonomous Mode + Telegram + HTTP_Execute | `npm run briefing` + `prompts/30-autonomous-followup-skill.md` |

> 三个 Skill 共享同一套粉丝画像与 Tenets；所有对外回复默认进入「待确认草稿」，创作者确认后才发送。

---

## 目录结构

```
.
├── README.md                              # 本文件（项目总览）
├── SUBMISSION.md                          # DoraHacks 提交材料与链接汇总
├── 涨粉参谋-产品定位与演示脚本.md             # CMP-3 产品研究员交付
├── CMP-4_Minds代理构建/                     # Minds Builder API/CLI 工程
│   ├── README.md / SETUP.md
│   ├── prompts/                           # 描述→精修→构建→验证剧本
│   ├── scripts/                           # onboard/build/memory/briefing/followup/demo
│   ├── lib/                               # minds-client-lib 薄封装
│   └── docs/                              # 架构 / 集成映射 / Runbook / 验证记录
└── CMP-5_演示视频/                          # 演示视频与视觉资产
    ├── 01_分镜/  02_动画源文件/
    ├── 03_关键视觉/  04_音频/
    └── 05_成片/                            # 提交版 + 1080p 母版
```

---

## 快速开始（Minds 代理）

前置：已注册 [hellominds.ai](https://hellominds.ai)，在 Builder console 创建 API key，Node.js 22+。

### 1) 安装与配置

```bash
cd CMP-4_Minds代理构建
npm install
cp .env.example .env
```

编辑 `.env`，至少填入 `MINDS_BUILDER_API_KEY`；可选填 `GROWTHMATE_MIND_ID`（用 `npm run list` 查 UUID，留空则自动取账号下第一个 Mind）。

### 2) 检查连接

```bash
npm run doctor              # 检查连通性
npm run list                # 列出账号下的 Mind，拿到 mindId
npm run show -- <mind-uuid> # 查看某个 Mind 详情
```

### 3) 构建 GrowthMate

```bash
npm run onboard             # 写入人设与 Tenets
npm run build               # 依次构建 记忆 → 连续性 → 自主跟进
npm run build:inspect       # 同 build，并在结尾附加权限检查
```

### 4) 运行与验证

```bash
npm run memory -- "@kiki 在最新视频下评论：上期那个汤底配方能出个详细版吗？"   # 写入一条粉丝记忆
npm run memory              # 查询：昨天谁最活跃？我答应过谁什么？
npm run followup            # 生成待确认回复草稿
npm run briefing            # 生成每日增长简报
npm run demo                # 端到端冒烟演示
npm run history             # 查看对话历史
```

> Telegram 已在线上 Mind 接入，`briefing` 会主动推送（未接入时降级为对话内推送）。真实账号验证状态、已装备 Skill 与待办，见 [`CMP-4_Minds代理构建/docs/live-verification.md`](CMP-4_Minds代理构建/docs/live-verification.md)。

---

## 演示视频

- 提交版：`CMP-5_演示视频/05_成片/GrowthMate_demo_720p_submit.mp4`（1280×720，约 6 MB）
- 1080p 母版：`CMP-5_演示视频/05_成片/GrowthMate_demo_v1.mp4`
- 动画源：`CMP-5_演示视频/02_动画源文件/demo.html`
- 分镜与视觉规范：`CMP-5_演示视频/01_分镜/README_分镜与视觉系统.md`

---

## 评审三要素对齐

- **问题契合度**：直击中腰部创作者「记不住粉丝、没人帮复盘、回复无法规模化又不敢模板化」三个痛点。
- **创新**：不是另一套 CRM/定时发帖工具，而是把 Minds 的长期记忆与自主运行作为产品核心。
- **可行性**：MVP 已在真实 Minds 账号完成构建与 dry-run 验证；平台数据源 / TTS 采用诚实降级，不依赖未验证能力。

完整论证见 [`涨粉参谋-产品定位与演示脚本.md`](涨粉参谋-产品定位与演示脚本.md)。

---

## 提交状态

最终 DoraHacks 提交动作由用户在 DoraHacks 账号完成。材料与 checklist 见 [`SUBMISSION.md`](SUBMISSION.md)。
