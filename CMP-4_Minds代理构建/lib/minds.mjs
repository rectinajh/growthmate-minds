import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createMindsClient, BUILDER_API_KEY_ENV } from "@animocabrands/minds-client-lib";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(projectRoot, ".env");
if (existsSync(envPath)) {
  try {
    process.loadEnvFile(envPath);
  } catch (err) {
    console.error(`Warning: could not load ${envPath}: ${err?.message ?? err}`);
  }
}

export function requireBuilderApiKey() {
  const key = process.env[BUILDER_API_KEY_ENV];
  if (!key) {
    throw new Error(
      `Missing ${BUILDER_API_KEY_ENV}. Copy .env.example to .env and set your Builder API key, then re-run.`,
    );
  }
  return key;
}

export function createClient() {
  return createMindsClient({ builderApiKey: requireBuilderApiKey() });
}

export function getAlias() {
  return process.env.GROWTHMATE_ALIAS || "growthmate-main";
}

export async function resolveMindId(client) {
  const envId = process.env.GROWTHMATE_MIND_ID?.trim();
  if (envId) return envId;

  const minds = await client.listMinds();
  if (!minds.length) {
    throw new Error(
      "No Minds found on this account. Create a Mind on hellominds.ai first (Account setup → Create a Mind).",
    );
  }
  const first = minds[0];
  console.error(
    `No GROWTHMATE_MIND_ID set; using first Mind: ${first.name || first.mindId} (${first.mindId})`,
  );
  return first.mindId;
}

export async function ensureConversation(client, mindId) {
  const alias = getAlias();
  const conversation = await client.ensureConversation(alias, mindId);
  return { alias, conversation };
}

export async function sendAndWait(client, alias, messageText, timeoutMs = 180_000) {
  const afterFingerprint = await client.getLatestHistoryFingerprint(alias);
  await client.sendMessage({ alias, messageText });

  const outcome = await client.waitForReply({
    alias,
    timeoutMs,
    afterFingerprint,
    sentMessageText: messageText,
  });

  if (outcome.timedOut) {
    console.error(
      `Timed out waiting for a Mind reply after ${timeoutMs}ms. The message may still be processing; run:\n  minds history ${alias}`,
    );
    return null;
  }
  return outcome.reply.messageText ?? "";
}

export function printJson(value) {
  console.log(JSON.stringify(value, null, 2));
}
