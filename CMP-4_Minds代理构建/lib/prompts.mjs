import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const PROMPT_DIR = resolve(projectRoot, "prompts");

const defaults = {
  CREATOR_NAME: "我（创作者）",
  CREATOR_HANDLE: "@creator",
  CREATOR_NICHE: "生活方式 / 健身",
  REPLY_TONE: "真诚、轻松、口语化，偶尔带一点点自嘲",
  REPLY_BOUNDARIES: "不承诺做不到的事；不评价政治/宗教/身材；不透露隐私与后台数据",
};

export function interpolate(text) {
  return text.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key) => {
    const value = process.env[key]?.trim() || defaults[key] || "";
    return value;
  });
}

export async function loadPrompt(name) {
  const raw = await readFile(resolve(PROMPT_DIR, name), "utf8");
  return interpolate(raw.trim());
}
