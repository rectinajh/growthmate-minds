import { createClient, resolveMindId, ensureConversation, sendAndWait, printJson } from "../lib/minds.mjs";
import { loadPrompt } from "../lib/prompts.mjs";

const client = createClient();
const mindId = await resolveMindId(client);

console.error("1) Mind 详情：");
printJson(await client.getMind(mindId));

const { alias } = await ensureConversation(client, mindId);
console.error(`\n2) 对话就绪：${alias}`);

const persona = await loadPrompt("00-persona.md");
const personaReply = await sendAndWait(client, alias, persona, 180_000);
console.log(`\n3) 人设确认回复：\n${personaReply ?? "(超时)"}`);

const seed = `记录一条粉丝互动：@kiki 在最新视频下评论「博主！上期说的那个汤底配方能出个详细版吗？」。`;
const seedReply = await sendAndWait(client, alias, seed, 180_000);
console.log(`\n4) 记忆写入回复：\n${seedReply ?? "(超时)"}`);

const query = await loadPrompt("92-run-memory-query.md");
const queryReply = await sendAndWait(client, alias, query, 180_000);
console.log(`\n5) 记忆查询回复：\n${queryReply ?? "(超时)"}`);

const followup = await loadPrompt("91-run-followup.md");
const followupReply = await sendAndWait(client, alias, followup, 180_000);
console.log(`\n6) 自主跟进草稿：\n${followupReply ?? "(超时)"}`);

console.error("\nDemo smoke test finished.");
