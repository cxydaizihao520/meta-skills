# References 索引

按场景拆分的知识 / 规则 / 契约。干活前读对应场景，干完后把新结论写回。

| 文件 | 场景 | 放什么 |
| --- | --- | --- |
| [`engineering-principles.md`](engineering-principles.md) | 通用工程 | KISS / YAGNI / 最小安全改动 / 验证习惯等通用原则 |
| [`requirements-and-communication.md`](requirements-and-communication.md) | 需求与沟通 | 非技术业主的需求翻译、确认方式、术语解释、任务流程 |
| [`permission-and-security.md`](permission-and-security.md) | 权限与安全 | 受限 vs 不存在、fail closed、塑形+强制、防泄露 |
| [`data-and-api-contracts.md`](data-and-api-contracts.md) | 数据与接口契约 | 返回结构稳定性、可信数据源、写入完整性 |
| [`frontend-ux.md`](frontend-ux.md) | 前端 / UX | 多状态一致性、相邻组件一致、视觉基线 |
| [`lessons-learned.md`](lessons-learned.md) | 经验日志 | 按时间/项目追加的具体踩坑与纠正（含项目特定经验） |

## 维护规则（元规则）

- **新增**：有新场景且现有文件都不合适时，新建一个 md，并在上表登记一行。
- **归位**：通用规律进对应场景文件；项目特定经验进 `lessons-learned.md` 并打项目标签。
- **格式**：每条尽量「现象 → 为什么重要 → 可复用规则/契约」。
- **整理**：定期合并重复、修正过时、删冗余；矛盾规则要更新或标注废弃，不要并列堆叠。
- **进化**：规则被证明错了就改它，别绕开。
- **拿不准就先问用户**，再把规则固化为通用条目。
