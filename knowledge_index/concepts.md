# Concepts

Updated: 2026-04-28

## Existing Concept Pages

- [[../wiki/LLM Agent Research Map.md]] — 当前 wiki 的总导航和研究地图。
- [[../wiki/GUI Agent.md]] — GUI 操作 agent 的概念页。
- [[../wiki/Agent Memory.md]] — agent memory 的概念页。
- [[../wiki/Agent Memory Benchmarks.md]] — memory benchmark 对比页。
- [[../wiki/Mobile Agent Personalization.md]] — mobile agent 个性化、主动性和同意机制概念页。
- [[../wiki/Agent Reflection.md]] — agent 反思和错误恢复概念页。
- [[../wiki/Function Calling.md]] — function calling 和移动助手工具调用概念页。
- [[../wiki/Agent Continual Learning.md]] — agent continual learning 概念页。
- [[../wiki/Long-Horizon Agent Evaluation.md]] — 长程 agent 评测概念页。
- [[../wiki/LLM-based Multi-Agent System.md]] — LLM 多智能体系统概念页。
- [[../wiki/LLM Knowledge Base.md]] — LLM 维护个人 wiki 的工作流概念页。
- [[../wiki/LLM Reasoning Decoding.md]] — CoT、多路径推理、答案聚合和分歧利用概念页。
- [[../wiki/Frontier Model Evaluation.md]] — frontier model 能力、安全和发布边界评测概念页。

## Candidate Concept Pages

- `Human-Agent-GUI Interaction` — 从 VeriOS 和 KnowU-Bench 抽象“何时问人、何时自主、何时保持沉默”。
- `User-Centric Memory` — 从 Agent Memory、KnowU-Bench、LaMP、Quick on the Uptake 细化用户偏好记忆。
- `Reward Design for GUI Agents` — 从 ADMIRE 抽象 milestone reward、process reward、outcome reward 的取舍。
- `Web Navigation Agent` — 从 Plan-MCTS 和 ColorBrowserAgent 抽象网页端长程 agent。
- `Agent Benchmark Taxonomy` — 汇总 ColorBench、HammerBench、Memory 系列、KnowU-Bench 的评测维度。
- `Experience Management Protocol` — 从 LaMAS 和 agent memory 交叉抽象多 agent 经验管理。
- `Conversational GUI Agent` — 从 MAESTRO 细化 CAG、GUI 原位适配和偏好驱动 workflow。
- `Uncertainty-Aware Agent Control` — 从 RecAgent、VeriOS 和 MobileUse 抽象不确定性触发的人类查询、反思和候选修正。

## Do Not Merge Yet

- `Agent Memory` 与 `LLM Knowledge Base`：二者都属于外部长期记忆，但前者服务 agent 执行，后者服务个人知识维护。
- `Mobile Agent Personalization` 与 `Agent Memory`：个性化依赖 user-centric memory，但还包含主动介入、同意和 GUI 执行边界。
- `Function Calling` 与 `GUI Agent`：两者都是 agent 行动面，但 function calling 是 API/tool 层，GUI agent 是视觉界面层。
- `Frontier Model Evaluation` 与 `Long-Horizon Agent Evaluation`：前者评模型能力和发布风险，后者评 agent 系统在任务环境中的行为。
