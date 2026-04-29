# Open Questions

Updated: 2026-04-28

## High-Value Research Questions

- 如何构建统一的 agent benchmark taxonomy，将 GUI、function calling、memory、personalization 和 multi-agent 协议放在同一坐标系中？
- 长上下文、RAG、外部记忆和参数 continual learning 分别适合保存什么信息？
- 个性化 mobile agent 的核心指标应如何平衡任务成功、偏好满足、主动性、同意和隐私？
- 反思机制何时应该触发：低置信度、轨迹异常、人类风险信号，还是 memory conflict？
- GUI agent 的多路径 benchmark 如何同时做到真实、可复现和低成本？
- 多智能体系统中的 experience management protocol 如何避免错误经验和隐私信息跨 agent 传播？
- 偏好记忆如何表达偏好强度、时间有效性和冲突，并安全地驱动 GUI 原位适配？
- GUI agent 的组件推荐如何避免漏掉真正目标元素，同时仍显著降低输入冗余？
- Self-Consistency 的多路径答案一致性，能否迁移到 agent 轨迹、GUI 终态或工具调用结果的一致性判断？
- Frontier model 的 model card 评测如何与 agent 系统评测建立可比坐标？

## Source Follow-Ups

- 补读 [[../sources/Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey.md]] 的 HTML/PDF，抽取 taxonomy 表、benchmark 列表和 open challenges。
- 补读 [[../sources/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]]，确认任务构造、用户模拟器、LLM-as-a-Judge 评分和模型结果。
- 补读 [[../sources/Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs.md]]，确认 BEAM 问题类型、LIGHT 组件和消融数据。
- 补读 [[../sources/MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks.md]]，确认多会话环境和“记忆被使用”的判定方式。
- 补读 [[../sources/Adaptive Milestone Reward for GUI Agents.md]]，确认 ADMIRE 的 milestone distillation 和 asymmetric credit assignment 细节。
- 补读 [[../sources/arXiv/MAESTRO_ Adapting GUIs and Guiding Navigation with User Preferences in Conversational Agents with GUIs.md]] 的统计结果和附录任务材料，确认偏好强度抽取、回退建议和语音负担的量化细节。
- 补读 [[../sources/arXiv/Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement.md]] 的 PDF、代码和 ComplexAction 数据集说明，确认样本量、标注协议和推荐路径实现。
- 补读 [[../sources/arXiv/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]] 的后续版本或 Anthropic 后续 model card，确认 Claude 3 之后 ASL/RSP 评估是否变化。

## Maintenance Questions

- 后续新引入资料应继续使用 `status: "new"` 作为 ingest 信号；本轮已有 21 个旧 source 已收敛为 `status: "processed"`。
- 是否需要恢复或归档已删除的旧 `codex/` 目录？当前知识资产已统一迁移到 `wiki/`。
- 是否需要创建本地 markdown search CLI，用于超过 100 页后的快速检索？
