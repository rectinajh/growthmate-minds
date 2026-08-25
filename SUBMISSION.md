# DoraHacks 提交材料（涨粉参谋 / GrowthMate）

> Creative Minds Jam #1（香港）·「涨粉与互动」赛道
> 提交截止：**2026-08-28 23:59（香港时间）**
> 最终提交动作由**用户在 DoraHacks 账号**完成；本文件是提交前的内容底稿与 checklist。

---

## 一、项目标识

- **项目名称**：`GrowthMate（涨粉参谋）`
- **赛道**：`涨粉与互动（Growth & Engagement）`
- **一句话简介（中文）**：把创作者「每天要回、但没时间回」的粉丝关系，交给一个记得住、会自动做、有创作者声音的常驻 Minds 代理。
- **一句话简介（English）**：`GrowthMate is an always-on Minds agent that remembers fans, stays in context across days, and autonomously follows up — so creators turn scattered engagement into growth.`

---

## 二、链接汇总

| 字段 | 内容 | 状态 |
|---|---|---|
| 代码仓库 | `https://github.com/rectinajh/growthmate-minds` | 已推送（见 commit） |
| 演示视频（提交版 MP4） | 仓库内：`CMP-5_演示视频/05_成片/GrowthMate_demo_720p_submit.mp4` | 本地已产出 |
| 演示视频（DoraHacks 要求的外部链接） | `[待用户上传后填写]` | ⚠️ 需用户完成 |
| 项目封面图 | `CMP-5_演示视频/03_关键视觉/01_hero_hook.png` 或 `08_endcard_cta.png` | 本地已产出 |
| Minds 集成验证记录 | `CMP-4_Minds代理构建/docs/live-verification.md` | 已产出 |
| 产品定位与演示脚本 | `涨粉参谋-产品定位与演示脚本.md` | 已产出 |

### 演示视频链接的处理

DoraHacks 通常要求 YouTube / Vimeo / Bilibili 等可在线播放链接，而非直接 MP4 文件。请从以下方式中任选：

1. **推荐**：把 `CMP-5_演示视频/05_成片/GrowthMate_demo_720p_submit.mp4` 上传到 YouTube（设为 unlisted）或 Bilibili。
2. 备选：上传到 Google Drive，设为「知道链接的人可查看」。
3. 临时直链：仓库 raw 链接（可下载，不建议作为主提交链接）：
   `https://raw.githubusercontent.com/rectinajh/growthmate-minds/main/CMP-5_演示视频/05_成片/GrowthMate_demo_720p_submit.mp4`

上传后，把最终链接回填到上方表格与 DoraHacks 表单。

---

## 三、项目详细描述（建议直接粘贴 DoraHacks「项目描述」）

### 中文版

**问题**

中小创作者涨粉的瓶颈往往不是「内容不好」，而是「关系经营不可持续」：评论越积越多、回复越来越同质化、记不住谁是谁，也没有人每天帮他复盘哪些互动值得跟进。

**方案**

GrowthMate 是创作者的常驻增长代理。接入后持续记忆粉丝互动，每天自动生成「增长简报」，并用创作者的语气草拟高价值回复。它把增长拆成三件事：

- **记忆**：记住谁评论过什么、偏好与承诺，并把可复用的规律沉淀为长期画像。
- **连续性**：回复时记得昨天/上周的互动，区分新粉、熟粉与待转化粉丝，不漏掉高价值互动。
- **自主跟进**：不等指令，每天自动生成增长简报，按授权条件主动推送待跟进名单与回复草稿。

**为什么用 Minds**

GrowthMate 不是「外部服务 + 包装一层 Minds」，而是把 Minds 原生能力作为产品核心：分层记忆用 `Episodes / Tenets`，长期人设用 Soul 的 `Tenets`，自主行为用 `Passive Autonomous Mode` 与 `Telegram`，可选数据源/TTS 用 `HTTP_Execute`。三个 Skill（粉丝记忆 / 关系连续性 / 自主跟进）均由 Mind 按官方六步流程自建并装备，并已在真实 Minds 账号完成验证。

**信任边界**

所有对外回复默认进入「待确认草稿」，创作者确认后才发送；只做已授权动作，不刷量、不伪装。

### English

**Problem**

For mid-tier creators, growth stalls not because the content is bad, but because relationship management does not scale: comments pile up, replies become templated, creators cannot remember who is who, and no one reviews daily which interactions are worth following up.

**Solution**

GrowthMate is an always-on Minds agent that remembers fan interactions, generates a daily growth briefing, and drafts high-value replies in the creator's voice. It operationalizes three behaviors:

- **Memory**: records who commented what, preferences, and promises; promotes reusable patterns into long-term fan profiles.
- **Continuity**: recalls yesterday's and last week's interactions, distinguishes new/loyal/about-to-convert fans, and never misses high-value replies.
- **Autonomous follow-up**: without a prompt, generates a daily briefing and pushes the follow-up list and reply drafts under authorized conditions.

**Why Minds**

GrowthMate uses Minds-native primitives as its core: `Episodes / Tenets` for layered memory, Soul `Tenets` for persona, `Passive Autonomous Mode` plus `Telegram` for proactive behavior, and `HTTP_Execute` for optional data sources/TTS. Three Skills (fan memory, relationship continuity, autonomous follow-up) are described, refined, built, and equipped using the official Minds six-step workflow, and verified against a real Minds account.

**Trust boundary**

Every outbound reply defaults to a "draft for confirmation" that the creator approves before sending; GrowthMate only takes authorized actions and never inflates metrics or impersonates.

---

## 四、提交前 Checklist

- [ ] 仓库 `growthmate-minds` 可公开访问，`README.md` 与 `SUBMISSION.md` 已更新。
- [ ] 仓库不含 `.env`、`node_modules/` 等敏感/生成物（已由 `.gitignore` 排除）。
- [ ] 演示视频已上传 YouTube/Bilibili/Drive，并把链接回填 DoraHacks 表单与本文件。
- [ ] 封面图已上传到 DoraHacks（使用 `01_hero_hook.png` 或 `08_endcard_cta.png`）。
- [ ] 项目名称、赛道、简介与详细描述已粘贴。
- [ ] 团队/分工信息已填写（产品研究员 / 工程师 / 设计师）。
- [ ] 提交截止前点击提交；提交后截图留存确认页。

---

## 五、安全提醒

- 不要在 DoraHacks 描述、评论或交互中粘贴任何 `MINDS_BUILDER_API_KEY`。
- 若此前在对话中暴露过 key，请在 Builder console 轮换 key 并更新本地 `.env`。
- 公开仓库已排除 `.env`；本地 `.env` 保持私有。
