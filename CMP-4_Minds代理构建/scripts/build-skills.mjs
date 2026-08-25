import { createClient, resolveMindId, ensureConversation, sendAndWait } from "../lib/minds.mjs";
import { loadPrompt } from "../lib/prompts.mjs";

const steps = [
  { file: "10-memory-skill.md", label: "记忆 skill" },
  { file: "20-continuity-skill.md", label: "连续性 skill" },
  { file: "30-autonomous-followup-skill.md", label: "自主跟进 skill" },
  { file: "40-refine.md", label: "精修" },
  { file: "50-build.md", label: "确认构建" },
];

const arg = process.argv[2];
if (arg === "--inspect") {
  steps.push({ file: "60-inspect.md", label: "检查权限" });
}

const client = createClient();
const mindId = await resolveMindId(client);
const { alias } = await ensureConversation(client, mindId);

for (const step of steps) {
  const prompt = await loadPrompt(step.file);
  console.error(`\n▶ 发送「${step.label}」（${step.file}）…`);
  const reply = await sendAndWait(client, alias, prompt, 240_000);
  console.log(`\n===== ${step.label} 回复 =====\n${reply ?? "(超时，未收到回复)"}`);
}

console.error("\n技能构建流程完成。用 `npm run memory` 验证记忆、`npm run briefing` 触发简报。");
