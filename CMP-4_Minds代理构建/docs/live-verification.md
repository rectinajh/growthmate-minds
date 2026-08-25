# 真实账号验证记录（2026-08-25）

## 结论

GrowthMate 已在真实 Minds 账号上完成构建并验证三类行为。

## 目标 Mind

- 名称：`GrowthMate.Advisor.Lin`
- mindId：`8099503e-f36b-1410-8466-00039ce7df11`
- 生成方式：由 `Celeste.Miriam.Adler` 通过 Mind Architect 生成独立子 Mind（用户选择 `spawn_sibling`），保留两个交易 Mind 身份不变。
- 生成后写入人设与核心 Tenets：Draft-only、三不碰边界、Episode→Tenet 沉淀。

## 已装备 Skill（API 实测 `minds mind skills list`）

| Skill | skillId | 职责 |
|---|---|---|
| fan-memory | `9F9A503E-F36B-1410-8466-00039CE7DF11` | Episode / Tenet 唯一写入端 |
| continuity | `A29A503E-F36B-1410-8466-00039CE7DF11` | 只读画像 + 生成带 `{{callback}}` 的待确认草稿 |
| autonomous-followup | `A59A503E-F36B-1410-8466-00039CE7DF11` | 每日 09:00 聚合 + 主动推送/降级 |

## 行为验证（对话 dry-run）

- 记忆：`npm run memory` → 正确识别空池，三问均返回「无记录」并给出来源与下一步，未编造。
- 连续性：`npm run followup` → 正确拒绝在空池下编草稿，解释「先读记忆 → 评分 → callback 草稿」流程。
- 自主跟进：`npm run briefing` → 产出完整「昨日增长简报」：速览 / 新增互动 / TOP5 / 待跟进 / 选题 / 待确认草稿；数据缺失处标注「待接数据源」。

## 待办（可选增强，不阻塞文字版演示）

1. **cognition 充值**：Mind 报告 `cognitionCycleRunway=4.0` 临界；接入外部 App / 真实数据入库 / 生成草稿前建议充值。
2. **Telegram 集成**：当前 `hasTelegram=false`；接通后简报可主动推送到 Telegram，否则降级为对话内推送。
3. **参数确认**：推送时间（默认 09:00 Asia/Shanghai）、简报长度（一屏版）、草稿数（1–2 条）。
4. **平台数据源**：连接 X / 小红书 / Instagram 公开端点后，简报的「新增/互动」才有真实数字。

## 安全提示

用户曾在一条拒绝原因中贴出 Builder API key（JWT）。建议尽快在 Builder console 轮换该 key，并在 `.env` 中更新；避免在评论/交互中粘贴密钥。
