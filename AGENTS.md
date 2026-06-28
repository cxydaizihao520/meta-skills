# AGENTS.md — meta-skills 仓库规则

## 仓库定位

本仓库存放跨项目复用的元技能。这里的技能应解决通用工作方式、反思流程、经验沉淀、技能治理等问题，而不是绑定某个业务项目的局部约定。

## 目录约束

- 每个技能放在仓库顶层独立目录中，例如 `gentle-self-reflection/`。
- 技能目录名必须与 `SKILL.md` frontmatter 的 `name` 保持一致。
- 根目录只放入口与仓库治理文件：`README.md`、`AGENTS.md`、`CLAUDE.md`、`LICENSE` 以及顶层技能目录。
- 详细规则、场景知识和经验沉淀放进对应技能的 `references/`；不要在根目录堆说明文档。

## 技能写作规则

- 除专业词汇、代码标识、路径、命令、配置键、外部接口名等必须保留英文的内容外，默认使用中文。
- `SKILL.md` 保持精炼，负责触发条件、核心流程和必要路由；长规则下沉到 `references/`。
- 可重复、确定性、容易写错的验证逻辑优先放到 `scripts/`。
- 新增或修改技能后，至少运行：

```bash
python3 /Users/daizhihao/.codex/skills/.system/skill-creator/scripts/quick_validate.py <skill-dir>
npx --yes skills add "$(pwd)" --list --full-depth
```

## 分发规则

- 本仓库是技能事实源。
- 外部 Agent 目录默认通过软链接引用这里的技能目录。
- 面向用户的推荐安装方式是 `npx skills add cxydaizihao520/meta-skills --skill <skill-name> -g ...`。
- 不要复制多份技能内容；确需复制时必须说明为什么不能使用软链接。
