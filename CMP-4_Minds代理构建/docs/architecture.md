# 架构与技术设计

## 目标

GrowthMate 是一个常驻 Minds 代理。它不是「外部服务 + 包装一层 Minds」，而是把 Minds 自身的长期记忆与自主运行能力作为产品核心。

## 设计原则

1. **Minds 原生优先**：记忆落库用 Episodes / Tenets，自主行为用 Passive Autonomous Mode 与 Skill Playbook，不额外搭一个影子数据库（MVP 不引入后端）。
2. **单一画像**：三个 Skill 共享同一套 Tenets，同一个粉丝只允许一份画像。
3. **可控优先**：所有对外回复默认「待确认草稿」，创作者确认后才发送。
4. **可降级**：外部数据源 / TTS 失败时，自动降级为「基于已有记忆的简报 / 文字草稿」。

## 数据模型（Minds 分层记忆）

| 层 | 用途 | GrowthMate 写入内容 |
|---|---|---|
| RAM | 当前对话的临时上下文 | 本轮要回复的评论、创作者当前指令 |
| Episodes | 过去发生的事件 | 每次粉丝互动：昵称、平台、时间、内容、意图、回复状态、跟进日期 |
| Tenets | 长期规则与事实 | 创作者人设/语气/边界；粉丝画像（兴趣、偏好、关系阶段）；运营规则（回复时机） |

> 区分原则：**「什么时候发生了什么」进 Episodes；「这条规律 / 特征长期成立」进 Tenets。**

## 组件

### prompts/（剧本层）
Minds 官方「Skill Building Guide」的六步流程：描述 → 精修 → 连接 → 运行 → 检查 → 发布。每个 prompt 是一段可直接发送给 Mind 的自然语言指令，Mind 自行生成四个工件：
- **Registry Offering**：技能列表展示（名称、用途）。
- **App Manifest**：与外部工具的连接声明。
- **Tool Schemas**：允许执行的具体动作。
- **Skill Playbook**：长期运行规则。

### lib/（客户端封装层）
- `minds.mjs`：封装 `@animocabrands/minds-client-lib` 的 key 校验、Mind 解析、对话确保、发送并等待回复。
- `prompts.mjs`：读取 prompt 文件并做 `{{VAR}}` 环境变量插值。

### scripts/（运行层）
每个脚本 = 一条稳定别名对话 + 发送对应 prompt + 等待回复。重复运行幂等（`ensureConversation` 同别名返回已存在对话）。

## 关键流程

### 构建流程
```
onboard（写入 Tenets）
  → 10-memory（描述记忆 Skill）
  → 20-continuity（描述连续性 Skill）
  → 30-autonomous（描述自主跟进 Skill）
  → 40-refine（统一精修）
  → 50-build（确认构建）
  → 60-inspect（权限检查，可选）
```

### 每日运行流程（由 Mind 自主触发，无需脚本常驻）
```
定时器（Passive Autonomous Mode / Telegram 集成）
  → 读取近期 Episodes
  → 生成增长简报 + 待跟进名单 + 回复草稿
  → 推送 Telegram（未连接则写入对话并在下次交互提醒）
```

### 高价值评论处理流程
```
粉丝评论进入
  → 记忆 Skill 检索该粉丝画像
  → 连续性 Skill 生成引用历史的待确认草稿
  → 创作者确认
  → 发送（Telegram / 平台回帖）
  → 记忆 Skill 回写「已回复 + 下次跟进」
```

## 外部依赖与降级

| 能力 | 首选 | 降级 |
|---|---|---|
| 主动推送 | Telegram 集成 | 写入对话，下次交互提醒 |
| 平台数据（新增粉丝/互动） | 已授权平台的公开 API（HTTP_Execute） | 明确标注「待接数据源」，只报已有记忆 |
| 声线回复 | 授权 TTS（ElevenLabs 等，HTTP_Execute） | 文字草稿 + 预录声线 |
