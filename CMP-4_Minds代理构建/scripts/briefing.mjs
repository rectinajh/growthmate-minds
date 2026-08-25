import { createClient, resolveMindId, ensureConversation, sendAndWait } from "../lib/minds.mjs";
import { loadPrompt } from "../lib/prompts.mjs";

const client = createClient();
const mindId = await resolveMindId(client);
const { alias } = await ensureConversation(client, mindId);
const prompt = await loadPrompt("90-run-briefing.md");

console.error(`Triggering daily growth briefing in "${alias}"…`);
const reply = await sendAndWait(client, alias, prompt);
console.log(reply ?? "");
