# Prompt Playbook（剧本与四件套）

Minds 官方「Skill Building Guide」六步：Describe → Refine → Connect → Run → Inspect → Publish。GrowthMate 按此把三类行为拆成三个 Skill，再用统一精修收敛行为。

## 完整流程（可直接复制）

```
1. 接入人设（Tenets）：
   见 prompts/00-persona.md

2. 描述三个 Skill：
   见 prompts/10-memory-skill.md
   见 prompts/20-continuity-skill.md
   见 prompts/30-autonomous-followup-skill.md

3. 精修：
   见 prompts/40-refine.md

4. 确认构建：
   见 prompts/50-build.md

5. 检查权限：
   见 prompts/60-inspect.md

6. 运行验证：
   见 prompts/90-run-briefing.md
   见 prompts/91-run-followup.md
   见 prompts/92-run-memory-query.md
```

## 三个 Skill 的产物要求

| Skill | Registry Offering（列表展示） | App Manifest（连接） | Tool Schemas（动作） | Skill Playbook（长期规则） |
|---|---|---|---|---|
| 粉丝记忆 | 「记住谁评论了什么、偏好、承诺」 | 原生记忆（无外部依赖）；可选 HTTP_Execute 只读数据源 | 写 Episode、提炼 Tenet、查询画像、列待跟进 | 同一粉丝只一份画像；不对外发布 |
| 关系连续性 | 「回复时记得昨天，不做套话机器人」 | 读取粉丝记忆 | 检索画像、判断关系阶段、生成待确认草稿 | 草稿先引用历史；默认待确认 |
| 自主跟进 | 「每天主动生成增长简报并推送」 | Telegram 集成；HTTP_Execute 可选数据源 | 生成简报、推 Telegram、写回待跟进 | 每 24h 最多 1 次；结论带为什么+建议动作 |

## 为什么用「向 Mind 描述」而不是手写 YAML

Minds 的 Builder 目前以 Mind 自建 Skill 为原生路径：用户用自然语言描述结果，Mind 生成并维护四件套。CLI/API 负责账号、对话、装备、运行与验证；行为定义交给 Mind 本身。这样既保证「Minds 集成深度」，又避免维护与平台内部格式不同步的配置。

## 人设插值变量

`prompts/` 中 `{{VAR}}` 由 `.env` 或环境变量注入：

| 变量 | 默认值 |
|---|---|
| `CREATOR_NAME` | 我（创作者） |
| `CREATOR_HANDLE` | @creator |
| `CREATOR_NICHE` | 生活方式 / 健身 |
| `REPLY_TONE` | 真诚、轻松、口语化，偶尔带一点点自嘲 |
| `REPLY_BOUNDARIES` | 不承诺做不到的事；不评价政治/宗教/身材；不透露隐私与后台数据 |
