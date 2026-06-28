import { spawn } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const SOURCE = "cxydaizihao520/meta-skills";
export const SKILL_NAME = "gentle-self-reflection";
export const SKILLS_CLI = "skills@1.5.13";

export const AGENTS = [
  { id: "claude-code", label: "Claude Code", default: true },
  { id: "codex", label: "Codex", default: true },
  { id: "trae-cn", label: "Trae CN", default: true },
  { id: "trae", label: "Trae", default: true },
  { id: "opencode", label: "OpenCode" },
  { id: "cursor", label: "Cursor" },
  { id: "gemini-cli", label: "Gemini CLI" },
  { id: "windsurf", label: "Windsurf" },
  { id: "cline", label: "Cline" },
  { id: "zed", label: "Zed" },
  { id: "roo", label: "Roo Code" },
  { id: "kiro-cli", label: "Kiro CLI" },
  { id: "qwen-code", label: "Qwen Code" },
  { id: "github-copilot", label: "GitHub Copilot" },
  { id: "antigravity", label: "Antigravity" },
  { id: "antigravity-cli", label: "Antigravity CLI" },
  { id: "openhands", label: "OpenHands" },
  { id: "qoder", label: "Qoder" },
  { id: "qoder-cn", label: "Qoder CN" },
  { id: "augment", label: "Augment" },
  { id: "aider-desk", label: "AiderDesk" },
  { id: "continue", label: "Continue" },
  { id: "goose", label: "Goose" },
  { id: "crush", label: "Crush" },
  { id: "devin", label: "Devin for Terminal" },
  { id: "tabnine-cli", label: "Tabnine CLI" },
  { id: "hermes-agent", label: "Hermes Agent" },
  { id: "adal", label: "AdaL" },
  { id: "amp", label: "Amp" },
  { id: "replit", label: "Replit" },
  { id: "universal", label: "Universal" },
  { id: "astrbot", label: "AstrBot" },
  { id: "autohand-code", label: "Autohand Code CLI" },
  { id: "bob", label: "IBM Bob" },
  { id: "openclaw", label: "OpenClaw" },
  { id: "dexto", label: "Dexto" },
  { id: "kimi-code-cli", label: "Kimi Code CLI" },
  { id: "loaf", label: "Loaf" },
  { id: "warp", label: "Warp" },
  { id: "codearts-agent", label: "CodeArts Agent" },
  { id: "codebuddy", label: "CodeBuddy" },
  { id: "codemaker", label: "Codemaker" },
  { id: "codestudio", label: "Code Studio" },
  { id: "command-code", label: "Command Code" },
  { id: "cortex", label: "Cortex Code" },
  { id: "deepagents", label: "Deep Agents" },
  { id: "droid", label: "Droid" },
  { id: "firebender", label: "Firebender" },
  { id: "forgecode", label: "ForgeCode" },
  { id: "inference-sh", label: "inference.sh" },
  { id: "jazz", label: "Jazz" },
  { id: "junie", label: "Junie" },
  { id: "iflow-cli", label: "iFlow CLI" },
  { id: "kilo", label: "Kilo Code" },
  { id: "kode", label: "Kode" },
  { id: "lingma", label: "Lingma" },
  { id: "mcpjam", label: "MCPJam" },
  { id: "mistral-vibe", label: "Mistral Vibe" },
  { id: "moxby", label: "Moxby" },
  { id: "mux", label: "Mux" },
  { id: "ona", label: "Ona" },
  { id: "pi", label: "Pi" },
  { id: "reasonix", label: "Reasonix" },
  { id: "rovodev", label: "Rovo Dev" },
  { id: "terramind", label: "Terramind" },
  { id: "tinycloud", label: "Tinycloud" },
  { id: "zencoder", label: "Zencoder" },
  { id: "zenflow", label: "Zenflow" },
  { id: "neovate", label: "Neovate" },
  { id: "pochi", label: "Pochi" },
];

export const DEFAULT_AGENT_IDS = AGENTS.filter((agent) => agent.default).map((agent) => agent.id);

export function parseAgentSelection(raw, agents = AGENTS, defaults = DEFAULT_AGENT_IDS) {
  const value = String(raw ?? "").trim();
  if (!value) return [...defaults];
  if (value === "*" || value.toLowerCase() === "all") {
    return agents.map((agent) => agent.id);
  }

  const selected = [];
  const tokens = value.split(/[\s,，]+/).filter(Boolean);
  for (const token of tokens) {
    const index = Number(token);
    let id;
    if (Number.isInteger(index) && index >= 1 && index <= agents.length) {
      id = agents[index - 1].id;
    } else if (agents.some((agent) => agent.id === token)) {
      id = token;
    } else {
      throw new Error(`未知 Agent：${token}`);
    }
    if (!selected.includes(id)) selected.push(id);
  }
  return selected;
}

export function buildSkillsArgs({
  agents = DEFAULT_AGENT_IDS,
  scope = "global",
  method = "symlink",
  yes = true,
  source = SOURCE,
  skill = SKILL_NAME,
  skillsCli = SKILLS_CLI,
} = {}) {
  const args = ["--yes", skillsCli, "add", source, "--skill", skill];
  if (scope === "global") args.push("--global");
  for (const agent of agents) args.push("--agent", agent);
  if (method === "copy") args.push("--copy");
  if (!yes) return args.filter((arg) => arg !== "--yes");
  return args;
}

export function parseCliArgs(argv) {
  const result = {
    agents: null,
    allAgents: false,
    scope: null,
    method: null,
    yes: false,
    dryRun: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") continue;
    if (arg === "-h" || arg === "--help") result.help = true;
    else if (arg === "-y" || arg === "--yes") result.yes = true;
    else if (arg === "--dry-run") result.dryRun = true;
    else if (arg === "--all-agents") result.allAgents = true;
    else if (arg === "--global" || arg === "-g") result.scope = "global";
    else if (arg === "--project" || arg === "-p") result.scope = "project";
    else if (arg === "--copy") result.method = "copy";
    else if (arg === "--symlink") result.method = "symlink";
    else if (arg === "--agent" || arg === "-a") {
      const values = [];
      let next = argv[i + 1];
      while (next && !next.startsWith("-")) {
        values.push(next);
        i += 1;
        next = argv[i + 1];
      }
      result.agents = [...(result.agents ?? []), ...values];
    } else {
      throw new Error(`未知参数：${arg}`);
    }
  }

  return result;
}

export function formatAgentList(agents = AGENTS) {
  return agents
    .map((agent, index) => {
      const marker = agent.default ? " *" : "";
      return `${String(index + 1).padStart(2, " ")}. ${agent.label} (${agent.id})${marker}`;
    })
    .join("\n");
}

export async function promptForInstallOptions({ readline = null } = {}) {
  const rl = readline ?? createInterface({ input, output });
  const close = () => {
    if (!readline) rl.close();
  };

  try {
    const defaultAgents = DEFAULT_AGENT_IDS.join(", ");
    const agentAnswer = await rl.question(`选择安装目标 Agent（编号/id，逗号分隔；回车默认 ${defaultAgents}；all 全选）：\n${formatAgentList()}\n> `);
    const agents = parseAgentSelection(agentAnswer);

    const scopeAnswer = await rl.question("安装范围：1) Global 全局  2) Project 当前项目，回车默认 Global\n> ");
    const scope = scopeAnswer.trim() === "2" || scopeAnswer.trim().toLowerCase() === "project" ? "project" : "global";

    const methodAnswer = await rl.question("安装方式：1) Symlink 单一事实源  2) Copy 独立副本，回车默认 Symlink\n> ");
    const method = methodAnswer.trim() === "2" || methodAnswer.trim().toLowerCase() === "copy" ? "copy" : "symlink";

    return { agents, scope, method };
  } finally {
    close();
  }
}

export function printHelp() {
  console.log(`meta-skills installer

用法：
  npx github:cxydaizihao520/meta-skills [options]

选项：
  -a, --agent <id...>  指定 Agent，可重复或一次写多个
  --all-agents         安装到内置列表中的所有 Agent
  -g, --global         安装到全局目录
  -p, --project        安装到当前项目目录
  --symlink            使用软链接安装（默认）
  --copy               复制到各 Agent 目录
  -y, --yes            跳过交互，使用默认 Agent
  --dry-run            只打印将执行的命令
  -h, --help           显示帮助

默认 Agent：${DEFAULT_AGENT_IDS.join(", ")}
底层安装命令：npx --yes ${SKILLS_CLI} add ...
`);
}

export async function runInstaller(argv = process.argv.slice(2)) {
  const options = parseCliArgs(argv);
  if (options.help) {
    printHelp();
    return 0;
  }

  let agents;
  let scope = options.scope;
  let method = options.method;

  if (options.allAgents) agents = AGENTS.map((agent) => agent.id);
  else if (options.agents?.length) agents = parseAgentSelection(options.agents.join(","));

  if (!options.yes && !agents && process.stdin.isTTY) {
    const prompted = await promptForInstallOptions();
    agents = prompted.agents;
    scope = scope ?? prompted.scope;
    method = method ?? prompted.method;
  }

  agents = agents ?? DEFAULT_AGENT_IDS;
  scope = scope ?? "global";
  method = method ?? "symlink";

  const args = buildSkillsArgs({ agents, scope, method, yes: true });
  console.log(`即将执行：npx ${args.join(" ")}`);

  if (options.dryRun) return 0;
  return await runNpx(args);
}

export function runNpx(args) {
  return new Promise((resolve) => {
    const child = spawn("npx", args, { stdio: "inherit" });
    child.on("exit", (code) => resolve(code ?? 1));
    child.on("error", (error) => {
      console.error(error.message);
      resolve(1);
    });
  });
}
