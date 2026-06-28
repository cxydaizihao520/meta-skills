# meta-skills

个人元技能仓库，用来集中维护可跨项目、跨智能体编程工具复用的技能。

## 技能清单

| 技能 | 说明 |
| --- | --- |
| [gentle-self-reflection](gentle-self-reflection/) | 通用自我反思元技能：在高风险或不确定任务中做目标复述、假设暴露、风险纠偏与经验沉淀 |

## 快速安装

安装到常用全局 Agent 目录：

```bash
npx --yes skills add cxydaizihao520/meta-skills --skill gentle-self-reflection -g -a codex -a claude-code -y
```

安装到 `skills` CLI 支持的所有 Agent：

```bash
npx --yes skills add cxydaizihao520/meta-skills --skill gentle-self-reflection -g -a '*' -y
```

只查看仓库中可安装的技能：

```bash
npx --yes skills add cxydaizihao520/meta-skills --list --full-depth
```

本地开发时可以直接从当前目录安装：

```bash
npx --yes skills add "$(pwd)" --skill gentle-self-reflection -g -a codex -a claude-code -y
```

`skills add` 默认使用软链接；只有确实需要每个 Agent 拿到独立副本时才加 `--copy`。

## 仓库结构

```text
meta-skills/
├── README.md
├── AGENTS.md
├── CLAUDE.md -> AGENTS.md
├── LICENSE
└── gentle-self-reflection/
    ├── SKILL.md
    ├── workflow.md
    └── references/
```

## 维护原则

- 每个技能一个顶层目录，目录名与 `SKILL.md` 里的 `name` 保持一致。
- 技能正文默认中文；代码标识、路径、命令、配置键和外部接口名保留英文。
- 只保留一个事实源；其它工具目录通过软链接引用本仓库里的技能目录。
- 修改技能后至少运行一次 `quick_validate.py` 和 `npx skills add ... --list`。
