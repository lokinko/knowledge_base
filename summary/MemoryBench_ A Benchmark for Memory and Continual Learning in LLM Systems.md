---
title: "MemoryBench: A Benchmark for Memory and Continual Learning in LLM Systems"
summary: 用用户反馈模拟框架评测 LLM 系统从服务期反馈中持续学习的能力
type: source-note
category: publication
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - Agent Memory
  - Continual Learning
  - User Feedback
  - Benchmark
  - LLM System
sources:
  - "[[../sources/MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems.md]]"
links:
  paper: https://arxiv.org/abs/2510.17281
related:
  - "[[Agent Memory]]"
  - "[[Agent Memory Benchmarks]]"
  - "[[Agent Continual Learning]]"
---

## 核心结论

MemoryBench 关注 LLM 系统在服务期从用户反馈中持续学习的能力。它认为单纯扩大数据、参数和 test-time computation 的边际收益正在下降，因此需要评测 memory 与 continual learning 框架能否从实践中积累。

论文提出用户反馈模拟框架和覆盖多领域、多语言、多任务类型的 benchmark，用于衡量 LLM systems 的 continual learning 能力。

## 背景与问题

已有 memory benchmarks 往往集中在同质化阅读理解或长文输入上，不能测试系统是否能从用户反馈中学习。MemoryBench 的关注点因此更接近生产环境中的服务期优化：

- 用户不断给出反馈。
- 系统需要把反馈转化为可复用经验。
- 新反馈可能影响后续同类任务。
- 效果和效率都需要评测。

## 方法、机制或主张

摘要层面可确认：

- 使用 user feedback simulation framework。
- benchmark 覆盖多个 domains、languages 和 task types。
- 用来评测 LLMsys 的 continual learning abilities。
- 实验显示现有 SOTA baselines 的效果和效率仍不满足需求。

## 证据与限制

当前笔记依据摘要页整理，不能具体说明各 baseline 失败在哪些任务，也不能比较 memory update algorithm 的细节。

## 与 wiki 中已有内容的关系

- 与 [[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]] 共享“服务期学习”方向；MemoryBench 更强调用户反馈模拟。
- 与 [[Agent-Dice_ Disentangling Knowledge Updates via Geometric Consensus for Agent Continual Learning]] 共享 continual learning 问题，但前者偏系统/记忆评测，后者偏参数更新融合。
- 与 [[LaMP_ When Large Language Models Meet Personalization]] 有连接：用户反馈是个性化 profile 更新的重要来源。

## 可复用启发

- 评测个性化和记忆系统时，应模拟用户反馈闭环，而不是只给静态 profile。
- continual learning 的效率也应被纳入指标，否则难以服务期部署。
- 多语言和多领域设置能暴露记忆策略的泛化问题。

## 待确认问题

- 用户反馈模拟是否包含错误反馈、稀疏反馈和偏好变化？
- MemoryBench 如何区分外部记忆更新和参数更新的贡献？
- benchmark 是否包含隐私约束下的反馈学习？

> 来源：[[../sources/MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems.md]]

