import { createClient, resolveMindId, ensureConversation, sendAndWait } from "../lib/minds.mjs";
import { loadPrompt } from "../lib/prompts.mjs";

const client = createClient();
const mindId = await resolveMindId(client);
const { alias } = await ensureConversation(client, mindId);
const prompt = await loadPrompt("91-run-followup.md");

console.error(`Requesting follow-up drafts in "${alias}"…`);
const reply = await sendAndWait(client, alias, prompt);
console.log(reply ?? "");
