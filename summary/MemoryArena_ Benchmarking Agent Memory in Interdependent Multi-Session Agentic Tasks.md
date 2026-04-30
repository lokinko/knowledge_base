---
title: "MemoryArena: Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks"
summary: 提出 Memory-Agent-Environment 循环下的多会话 agent memory gym，评测记忆如何被后续行动使用
type: source-note
category: publication
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - Agent Memory
  - Benchmark
  - Multi-Session
  - Web Navigation
  - Preference-Constrained Planning
  - Agentic Task
sources:
  - "[[../sources/MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks.md]]"
links:
  paper: https://arxiv.org/abs/2602.16313
related:
  - "[[Agent Memory]]"
  - "[[Agent Memory Benchmarks]]"
  - "[[Long-Horizon Agent Evaluation]]"
---

## 核心结论

MemoryArena 认为 agent memory 的关键不是“是否能回忆过去内容”，而是过去交互形成的记忆是否能指导未来行动。它提出 `Memory-Agent-Environment` 循环，用多会话、相互依赖的任务来评测 agent 如何从早期行动和反馈中蒸馏经验，并在后续子任务中使用。

摘要列出的任务覆盖 web navigation、preference-constrained planning、progressive information search 和 sequential formal reasoning。

## 背景与问题

现有 memory evaluation 常把记忆和行动拆开：

- 一类只测对过去文本或对话的 recall。
- 一类只测单会话任务执行，不需要长期记忆。

MemoryArena 的问题定义更严格：记忆必须在环境交互中产生，并在后续任务中改变行动策略。

## 方法、机制或主张

摘要层面可确认：

- benchmark 由人工设计的 agentic tasks 组成。
- 子任务之间存在显式依赖。
- agent 需要把早期行动和反馈蒸馏成记忆，再用于后续行动。
- 即便在 LoCoMo 等长上下文记忆基准上接近饱和的 agent，在这种 agentic setting 中也表现不佳。

这说明“长文本记忆”与“行动可用记忆”是不同能力。

## 证据与限制

论文摘要声称，MemoryArena 暴露了当前 memory agent evaluation 的缺口。当前笔记未核验任务数量、环境实现和模型实验表，因此不展开具体性能排名。

## 与 wiki 中已有内容的关系

- [[Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs]] 强调超长对话记忆；MemoryArena 强调多会话行动依赖。
- [[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]] 强调连续任务流中的记忆演化；MemoryArena 强调环境回路和任务间依赖。
- [[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]] 中的个性化任务也依赖从日志中形成可行动记忆。

## 可复用启发

- 记忆评测要看“是否改变后续行动”，而不是只看能否复述。
- 多会话任务应显式设计前后依赖，否则长期记忆不是必要能力。
- 偏好约束规划是连接 agent memory 与 personalization 的重要场景。

## 待确认问题

- MemoryArena 如何定义和验证“记忆被使用”？
- 是否区分错误记忆、过期记忆和缺失记忆？
- 环境任务是否可复现实验，还是依赖在线系统状态？

> 来源：[[../sources/MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks.md]]

