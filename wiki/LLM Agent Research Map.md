---
title: "LLM Agent Research Map"
summary: 本库围绕 GUI agent、agent memory、个性化、反思、function calling、多智能体和知识库维护形成的研究地图
type: synthesis
category: research-map
status: active
created: 2026-04-22
updated: 2026-04-28
source_count: 25
confidence: medium
tags:
  - LLM Agent
  - Research Map
  - GUI Agent
  - Agent Memory
  - Personalization
  - Benchmark
related:
  - "[[GUI Agent]]"
  - "[[Agent Memory]]"
  - "[[Mobile Agent Personalization]]"
  - "[[Long-Horizon Agent Evaluation]]"
  - "[[Agent Reflection]]"
  - "[[Function Calling]]"
  - "[[Agent Continual Learning]]"
  - "[[LLM-based Multi-Agent System]]"
  - "[[LLM Reasoning Decoding]]"
  - "[[Frontier Model Evaluation]]"
  - "[[LLM Knowledge Base]]"
---

## 地图结论

当前 wiki 的核心不是泛泛的 LLM agent，而是“长程、个性化、可记忆、可评测、可维护”的 agent 系统。25 个 sources 可以组织成 8 条主线：

- [[GUI Agent]]：移动端、网页端和 OS 级 GUI 操作。
- [[Agent Memory]]：长期记忆、服务期学习、多会话任务和用户中心记忆。
- [[Mobile Agent Personalization]]：偏好推断、隐式意图、主动介入与同意。
- [[Agent Reflection]]：从单步纠错到层级反思、多视角对比和长程执行恢复。
- [[Function Calling]]：移动助手工具调用、函数选择鲁棒性和细粒度评测。
- [[LLM-based Multi-Agent System]]：多 agent 协议、隐私、credit allocation 和商业生态。
- [[LLM Reasoning Decoding]]：多路径推理、答案聚合和分歧利用。
- [[Frontier Model Evaluation]]：模型卡、能力评测、安全评测和发布边界。

另有 [[LLM Knowledge Base]] 作为本仓库自身的方法论：用 LLM 把 `sources/` 增量编译成可维护 wiki。

## 主要问题簇

### 1. 长程 GUI 执行为什么难

相关页面：[[MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation]]、[[ColorBench_ Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks]]、[[Plan-MCTS_ Plan Exploration for Action Exploitation in Web Navigation]]、[[Adaptive Milestone Reward for GUI Agents]]。

共同问题是：真实 GUI 任务路径长、状态噪声大、可行路径稀疏、错误会累积。对应方法分别从层级反思、图结构 benchmark、语义计划搜索和 milestone reward 处理这些困难。

新增 [[MAESTRO_ Adapting GUIs and Guiding Navigation with User Preferences in Conversational Agents with GUIs]] 和 [[Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement]] 后，这条主线增加了两个维度：偏好驱动 GUI 原位适配，以及用组件推荐降低感知不确定性。

### 2. agent 记忆如何从 recall 走向行动可用

相关页面：[[Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey]]、[[MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks]]、[[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]]、[[MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems]]、[[Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs]]、[[Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions]]。

共同趋势是：memory benchmark 正在从静态长文本 QA 转向多轮、连续、多会话、用户反馈和行动依赖。

### 3. 个性化 agent 不等于更会执行

相关页面：[[Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents]]、[[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]]、[[LaMP_ When Large Language Models Meet Personalization]]、[[VeriOS_ Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents]]。

共同结论是：个人助手难点不只是 GUI navigation，而是用户偏好、隐式意图、主动性边界和同意机制。

### 4. 反思和记忆都需要“何时触发”

相关页面：[[Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives]]、[[MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation]]、[[ColorBrowserAgent_ Complex Long-Horizon Browser Agent with Adaptive Knowledge Evolution]]。

共同启发是：反思和记忆不应默认每步全开。关键是选择触发条件、粒度和压缩方式，避免反思噪声或错误记忆污染系统。

### 5. 推理解码与 agent 反思共享“多候选”思想

相关页面：[[Self-Consistency Improves Chain of Thought Reasoning in Language Models]]、[[LLM Reasoning Decoding]]、[[Agent Reflection]]。

Self-Consistency 表明，对固定答案推理任务，多条 reasoning path 的答案一致性可以替代单条 greedy path。这个思想不能直接等同于 agent 反思，但它提示：长程 agent 也可能需要从单轨迹决策扩展到多候选轨迹比较。

### 6. Frontier model 能力不是 agent 系统能力

相关页面：[[The Claude 3 Model Family_Opus, Sonnet, Haiku]]、[[Frontier Model Evaluation]]、[[Function Calling]]。

Claude 3 model card 记录了模型家族能力、多模态、tool use 和安全边界；但它不能直接推出模型在 GUI agent、memory agent 或移动 function-calling 场景中的表现。系统级 benchmark 仍然必要。

## 当前边界

本库目前偏向论文摘要页、少量 HTML/PDF 笔记和 model card。很多页面的技术细节、实验表和附录尚未核验。索引和概念页中的综合判断应视为“基于当前 sources 的研究组织”，不是最终综述结论。

## 后续扩展

- 对 [[Agent Memory Benchmarks]] 做表格化对比：场景、记忆类型、是否多会话、是否行动依赖、是否有用户反馈。
- 对 [[Long-Horizon Agent Evaluation]] 做 benchmark taxonomy。
- 补读关键 PDF/HTML，验证摘要页无法确认的实验细节。
