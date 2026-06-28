import test from "node:test";
import assert from "node:assert/strict";

import {
  AGENTS,
  DEFAULT_AGENT_IDS,
  SKILLS_CLI,
  buildSkillsArgs,
  parseAgentSelection,
  parseCliArgs,
} from "../lib/installer.mjs";

test("empty selection uses default common agents", () => {
  assert.deepEqual(parseAgentSelection(""), DEFAULT_AGENT_IDS);
});

test("selection supports indexes, ids and deduplication", () => {
  assert.deepEqual(parseAgentSelection("1, codex, 1, trae"), [
    AGENTS[0].id,
    "codex",
    "trae",
  ]);
});

test("selection supports all agents", () => {
  assert.deepEqual(parseAgentSelection("all"), AGENTS.map((agent) => agent.id));
});

test("agent list includes broad skills CLI targets", () => {
  const ids = new Set(AGENTS.map((agent) => agent.id));
  for (const id of ["claude-code", "codex", "trae", "trae-cn", "moxby", "zencoder"]) {
    assert.equal(ids.has(id), true, `${id} should be available`);
  }
  assert.equal(ids.size, AGENTS.length, "agent ids should be unique");
  assert.equal(AGENTS.length >= 70, true, "agent list should cover skills CLI global targets");
});

test("selection rejects unknown agents", () => {
  assert.throws(() => parseAgentSelection("not-real"), /未知 Agent/);
});

test("buildSkillsArgs targets selected agents globally by symlink", () => {
  assert.deepEqual(buildSkillsArgs({ agents: ["claude-code", "codex"] }), [
    "--yes",
    SKILLS_CLI,
    "add",
    "cxydaizihao520/meta-skills",
    "--skill",
    "gentle-self-reflection",
    "--global",
    "--agent",
    "claude-code",
    "--agent",
    "codex",
  ]);
});

test("buildSkillsArgs supports project copy install", () => {
  assert.deepEqual(
    buildSkillsArgs({ agents: ["trae-cn"], scope: "project", method: "copy" }),
    [
      "--yes",
      SKILLS_CLI,
      "add",
      "cxydaizihao520/meta-skills",
      "--skill",
      "gentle-self-reflection",
      "--agent",
      "trae-cn",
      "--copy",
    ],
  );
});

test("parseCliArgs accepts multiple agents and install flags", () => {
  assert.deepEqual(parseCliArgs(["-a", "claude-code", "codex", "-g", "--copy", "-y"]), {
    agents: ["claude-code", "codex"],
    allAgents: false,
    scope: "global",
    method: "copy",
    yes: true,
    dryRun: false,
    help: false,
  });
});

test("parseCliArgs ignores npx argument separator", () => {
  assert.equal(parseCliArgs(["--", "--help"]).help, true);
});
