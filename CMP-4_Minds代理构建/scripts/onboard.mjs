import { createClient, resolveMindId, ensureConversation, sendAndWait } from "../lib/minds.mjs";
import { loadPrompt } from "../lib/prompts.mjs";

const client = createClient();
const mindId = await resolveMindId(client);
const { alias } = await ensureConversation(client, mindId);
const prompt = await loadPrompt("00-persona.md");

console.error(`Sending persona prompt to conversation "${alias}" (Mind ${mindId})…`);
const reply = await sendAndWait(client, alias, prompt);
console.log(reply ?? "");
