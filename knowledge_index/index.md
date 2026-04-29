# Knowledge Index

Updated: 2026-04-28

## Research Maps

- [[../wiki/LLM Agent Research Map.md]] — 将本库 25 个 sources 组织为 GUI agent、agent memory、个性化、反思、function calling、多智能体、推理解码、frontier model evaluation 和知识库维护等主线。type: synthesis; tags: LLM Agent, Research Map; sources: 25; updated: 2026-04-28

## Concepts

- [[../wiki/GUI Agent.md]] — 以图形界面为行动空间的 LLM/VLM agent，核心挑战包括长程执行、状态感知、错误恢复、偏好驱动 GUI 适配和用户授权。type: concept; tags: GUI Agent, Mobile Agent, OS Agent, Web Navigation; sources: 12; updated: 2026-04-28
- [[../wiki/Agent Memory.md]] — Agent 在长程、多会话和用户依赖环境中积累、更新、检索、遗忘和复用信息的机制。type: concept; tags: Agent Memory, Long-Term Memory, Continual Learning; sources: 8; updated: 2026-04-22
- [[../wiki/Agent Memory Benchmarks.md]] — 对比长期记忆、增量多轮、服务期反馈、自演化记忆和多会话行动记忆 benchmark 的问题设定。type: comparison; tags: Agent Memory, Benchmark, Comparison; sources: 6; updated: 2026-04-22
- [[../wiki/Mobile Agent Personalization.md]] — Mobile agent 根据用户历史、演示、行为日志和实时互动推断偏好，并在 GUI 中校准主动帮助边界。type: concept; tags: Mobile Agent, Personalization, Consent; sources: 5; updated: 2026-04-28
- [[../wiki/Agent Reflection.md]] — Agent 在无外部或弱外部反馈下检查、修正和恢复自身推理或执行轨迹的机制，也包括多路径推理的一致性信号。type: concept; tags: Reflection, Self-Correction, Error Recovery; sources: 6; updated: 2026-04-28
- [[../wiki/Function Calling.md]] — LLM agent 将用户意图映射为外部函数、API 或工具调用的能力，需区分通用 model card 能力与场景化鲁棒性。type: concept; tags: Function Calling, Tool Use, Mobile Assistant; sources: 4; updated: 2026-04-28
- [[../wiki/Agent Continual Learning.md]] — Agent 在持续接收新任务、新反馈和新环境时更新知识，同时避免灾难性遗忘的能力。type: concept; tags: Continual Learning, Stability-Plasticity; sources: 4; updated: 2026-04-22
- [[../wiki/Long-Horizon Agent Evaluation.md]] — 面向长步骤、多状态、多路径、跨会话和偏好冲突任务的 agent 评测问题。type: concept; tags: Benchmark, Long-Horizon, GUI Agent; sources: 12; updated: 2026-04-28
- [[../wiki/LLM-based Multi-Agent System.md]] — 由多个 LLM agent 通过协议、路由、记忆、工具和激励机制协作形成的智能系统。type: concept; tags: Multi-Agent, Protocol, Credit Allocation; sources: 1; updated: 2026-04-22
- [[../wiki/LLM Knowledge Base.md]] — 由 LLM 持续把原始资料编译为 markdown wiki、索引、概念页、查询产物和健康检查记录的个人知识库模式。type: concept; tags: LLM Knowledge Base, Obsidian, Wiki Maintenance; sources: 2; updated: 2026-04-22
- [[../wiki/LLM Reasoning Decoding.md]] — 面向推理任务的解码策略，关注多路径采样、答案聚合和分歧利用。type: concept; tags: Reasoning, Decoding, Chain of Thought; sources: 2; updated: 2026-04-28
- [[../wiki/Frontier Model Evaluation.md]] — 对 frontier model 的能力、使用边界、安全风险和部署等级进行综合评测与披露的框架。type: concept; tags: Frontier Model, Model Card, Safety Evaluation; sources: 1; updated: 2026-04-28

## GUI, Mobile, Web, and OS Agents

- [[../wiki/MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation.md]] — 通过 action、trajectory、global 三层反思和主动探索机制，提升移动长程任务中的鲁棒执行能力。type: source-note; tags: Mobile Agent, GUI Agent, Reflection; sources: 1; updated: 2026-04-22
- [[../wiki/ColorBench_ Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks.md]] — 用图结构静态模拟动态手机交互，支持多正确路径、原子能力分析和复杂长程任务评测。type: source-note; tags: Benchmark, Mobile Agent, Long-Horizon; sources: 1; updated: 2026-04-22
- [[../wiki/Adaptive Milestone Reward for GUI Agents.md]] — 通过可验证、可演化的 milestone 奖励和非对称 credit assignment，缓解长程 GUI 强化学习中的时序 credit assignment 问题。type: source-note; tags: GUI Agent, Reinforcement Learning, Reward; sources: 1; updated: 2026-04-22
- [[../wiki/Plan-MCTS_ Plan Exploration for Action Exploitation in Web Navigation.md]] — 将网页导航搜索从原子动作空间转到语义计划空间，以提升长程网页任务中的搜索效率和稳定性。type: source-note; tags: Web Navigation, MCTS, Planning; sources: 1; updated: 2026-04-22
- [[../wiki/ColorBrowserAgent_ Complex Long-Horizon Browser Agent with Adaptive Knowledge Evolution.md]] — 通过人类在环知识适配和知识对齐的渐进式摘要，提升异构网站和长程网页任务中的稳定性。type: source-note; tags: Browser Agent, Knowledge, Long-Horizon; sources: 1; updated: 2026-04-22
- [[../wiki/VeriOS_ Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents.md]] — 让 OS agent 在不可信场景下主动向人发问，在可信场景下自主执行，以降低过度执行风险。type: source-note; tags: OS Agent, Trustworthiness, Human-in-the-Loop; sources: 1; updated: 2026-04-22
- [[../wiki/MAESTRO_ Adapting GUIs and Guiding Navigation with User Preferences in Conversational Agents with GUIs.md]] — 用偏好记忆驱动 GUI 原位适配和 workflow 回退导航，让 CAG 支持多步骤偏好决策。type: source-note; tags: GUI Agent, Conversational Agent, Personalization; sources: 1; updated: 2026-04-28
- [[../wiki/Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement.md]] — 通过组件推荐降低感知不确定性，并在意图含糊时引入人类反馈。type: source-note; tags: GUI Agent, Mobile Agent, Human-in-the-Loop; sources: 1; updated: 2026-04-28

## Personalization and Proactivity

- [[../wiki/Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents.md]] — 通过显式 SOP 与隐式习惯库双通道建模，让 mobile-use agent 更贴近具体用户的真实意图。type: source-note; tags: Mobile Agent, Personalization, Intent; sources: 1; updated: 2026-04-22
- [[../wiki/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]] — 提出在线 Android 基准，评测个性化 mobile agent 的偏好获取、主动介入、同意协商和拒绝后克制。type: source-note; tags: Mobile Agent, Personalization, Proactivity, Consent; sources: 1; updated: 2026-04-22
- [[../wiki/LaMP_ When Large Language Models Meet Personalization.md]] — 提出 LaMP 个性化语言模型基准，覆盖 7 类任务并评估基于用户 profile 的检索增强个性化。type: source-note; tags: Personalization, Benchmark, Retrieval Augmentation; sources: 1; updated: 2026-04-22

## Agent Memory

- [[../wiki/Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey.md]] — 从记忆载体、认知机制和记忆主体三条轴线统一整理 foundation agent memory 的研究版图。type: source-note; tags: Agent Memory, Survey, Foundation Agent; sources: 1; updated: 2026-04-22
- [[../wiki/Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs.md]] — 提出 BEAM 长对话记忆基准与 LIGHT 三层记忆框架，用于测试百万 token 级上下文中的长期记忆能力。type: source-note; tags: Agent Memory, Long-Term Memory, BEAM, LIGHT; sources: 1; updated: 2026-04-22
- [[../wiki/Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions.md]] — 提出 MemoryAgentBench，用增量多轮交互评测记忆 agent 的检索、测试时学习、长程理解和选择性遗忘。type: source-note; tags: Agent Memory, Multi-Turn Interaction, Selective Forgetting; sources: 1; updated: 2026-04-22
- [[../wiki/MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems.md]] — 用用户反馈模拟框架评测 LLM 系统从服务期反馈中持续学习的能力。type: source-note; tags: Agent Memory, Continual Learning, User Feedback; sources: 1; updated: 2026-04-22
- [[../wiki/Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory.md]] — 用连续任务流评测 LLM agent 的自演化记忆，并提出 ExpRAG 与 ReMem 作为经验复用和记忆更新基线。type: source-note; tags: Agent Memory, Test-Time Learning, Self-Evolving Memory; sources: 1; updated: 2026-04-22
- [[../wiki/MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks.md]] — 提出 Memory-Agent-Environment 循环下的多会话 agent memory gym，评测记忆如何被后续行动使用。type: source-note; tags: Agent Memory, Multi-Session, Agentic Task; sources: 1; updated: 2026-04-22

## Reflection, Continual Learning, Function Calling, and Multi-Agent

- [[../wiki/Self-Consistency Improves Chain of Thought Reasoning in Language Models.md]] — 用多条采样 reasoning path 的答案一致性替代 CoT greedy decoding，提升固定答案推理任务。type: source-note; tags: Reasoning, Chain of Thought, Decoding; sources: 1; updated: 2026-04-28
- [[../wiki/Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives.md]] — 让模型先生成多种解题视角，再对比差异并总结检查清单，以提升无外部反馈场景下的自反思稳定性。type: source-note; tags: Reflection, Reasoning, Prompting; sources: 1; updated: 2026-04-22
- [[../wiki/Agent-Dice_ Disentangling Knowledge Updates via Geometric Consensus for Agent Continual Learning.md]] — 通过几何共识过滤和曲率加权融合 task vector，缓解 agent continual learning 中的稳定性-可塑性困境。type: source-note; tags: Continual Learning, Parameter Fusion, Agent; sources: 1; updated: 2026-04-22
- [[../wiki/Hammer_ Robust Function-Calling for On-Device Language Models via Function Masking.md]] — 基于 Function Masking 的轻量级 on-device function-calling 模型。type: source-note; tags: Function Calling, On-Device Model, Tool Use; sources: 1; updated: 2026-04-22
- [[../wiki/HammerBench_ Fine-Grained Function-Calling Evaluation in Real Mobile Device Scenarios.md]] — 面向移动助手多轮对话的细粒度 function-calling benchmark。type: source-note; tags: Function Calling, Benchmark, Mobile Assistant; sources: 1; updated: 2026-04-22
- [[../wiki/LLM-based Multi-Agent Systems_ Techniques and Business Perspectives.md]] — 从协议、训练、安全、隐私到流量与智能变现，讨论 LLM-based Multi-Agent System 的整体框架。type: source-note; tags: Multi-Agent, Protocol, Business; sources: 1; updated: 2026-04-22

## Frontier Models and Model Cards

- [[../wiki/The Claude 3 Model Family_Opus, Sonnet, Haiku.md]] — Claude 3 model card 同时记录模型家族定位、能力评测、多模态、tool use、安全边界和 ASL-2 风险判断。type: source-note; tags: Model Card, Frontier Model, Safety Evaluation; sources: 1; updated: 2026-04-28

## Workflow and Knowledge Base

- [[../wiki/LLM Knowledge Base @karpathy on X.md]] — Karpathy 描述用 LLM 将 raw sources 增量编译为 Obsidian markdown wiki，并持续维护索引、问答输出和健康检查。type: source-note; tags: LLM Knowledge Base, Obsidian, Wiki Maintenance; sources: 1; updated: 2026-04-22
