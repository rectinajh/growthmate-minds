import { createClient, resolveMindId, ensureConversation, sendAndWait } from "../lib/minds.mjs";
import { loadPrompt } from "../lib/prompts.mjs";

const client = createClient();
const mindId = await resolveMindId(client);
const { alias } = await ensureConversation(client, mindId);

let prompt;
const text = process.argv.slice(2).join(" ").trim();
if (text) {
  prompt = `请运行「粉丝记忆」Skill，把下面这条粉丝互动记录进记忆（Episode），并同步更新/提炼相关 Tenet：\n\n${text}\n\n记录完成后请用一句话确认，并告诉我这位粉丝当前的关系阶段。`;
} else {
  prompt = await loadPrompt("92-run-memory-query.md");
}

console.error(`Sending memory prompt to "${alias}"…`);
const reply = await sendAndWait(client, alias, prompt);
console.log(reply ?? "");
