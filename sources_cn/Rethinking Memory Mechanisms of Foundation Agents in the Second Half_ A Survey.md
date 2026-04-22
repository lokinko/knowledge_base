---
title: "Rethinking Memory Mechanisms of Foundation Agents in the Second Half: A Survey"
summary: 从记忆载体、认知机制和记忆主体三条轴线统一整理 foundation agent memory 的研究版图
type: source-note
category: publication
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - Agent Memory
  - Survey
  - Foundation Agent
  - Long-Horizon
  - User-Centric Memory
sources:
  - "[[../sources/Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey.md]]"
links:
  paper: https://arxiv.org/abs/2602.06052
related:
  - "[[Agent Memory]]"
  - "[[Agent Memory Benchmarks]]"
---

## 核心结论

这篇 survey 把 foundation agent memory 放在“AI 研究进入 second half”的背景下理解：当目标从 benchmark score 转向真实、长程、动态和用户依赖的环境，agent 面临 context explosion，需要持续积累、管理并选择性复用大量信息。

论文提出三条统一视角：

- `memory substrate`：内部记忆与外部记忆。
- `cognitive mechanism`：episodic、semantic、sensory、working、procedural memory。
- `memory subject`：agent-centric 与 user-centric memory。

## 背景与问题

长程 agent 的实用性瓶颈不是单次推理，而是跨交互的信息积累和选择性复用。没有记忆机制，agent 很难处理：

- 长期用户偏好。
- 多会话任务状态。
- 环境经验。
- procedural know-how。
- 冲突、过期和隐私敏感信息。

## 方法、机制或主张

摘要层面可确认，survey 不只整理记忆类型，还讨论：

- 不同 agent topology 中 memory 如何实例化和运行。
- memory operations 的 learning policies。
- 评测 memory utility 的 benchmarks 与 metrics。
- 开放挑战和未来方向。

它可以作为本库所有 memory benchmark 和 mobile personalization 材料的背景综述。

## 证据与限制

本页依据 arXiv 摘要页整理，没有展开 survey 内部分类表和具体论文谱系。后续若要深入，应补读 HTML/PDF，抽取 taxonomy、benchmark list 和 open problems。

## 与 wiki 中已有内容的关系

- [[Agent Memory]] 是本 survey 在本库中的概念化整理页。
- [[MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems]]、[[MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks]]、[[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]]、[[Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs]] 可作为 survey 中 evaluation 方向的具体样例。
- [[Mobile Agent Personalization]] 中的用户偏好、同意和行为日志，本质上依赖 user-centric memory。

## 可复用启发

- 记忆页和索引应区分 substrate、mechanism 和 subject，避免把所有 memory paper 混成一个标签。
- user-centric memory 与 agent-centric memory 的边界要清晰，因为前者涉及隐私、同意和偏好漂移。
- memory utility 的评测应和真实长程任务绑定，而不是只测文本召回。

## 待确认问题

- survey 如何定义 memory operation learning policies？
- 内部记忆与外部记忆在安全和可解释性上有哪些取舍？
- 当前 benchmark 是否足够覆盖 procedural memory 和 sensory memory？

> 来源：[[../sources/Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey.md]]

