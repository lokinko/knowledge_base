---
title: "Agent Memory Benchmarks"
summary: 对比本库中长期记忆、增量多轮、服务期反馈、自演化记忆和多会话行动记忆 benchmark 的问题设定
type: comparison
category: benchmark
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 6
confidence: medium
tags:
  - Agent Memory
  - Benchmark
  - Comparison
  - Long-Term Memory
related:
  - "[[Agent Memory]]"
---

## 对比结论

本库中的 memory benchmarks 可以按“记忆是否需要影响行动”和“记忆是否随交互持续更新”来区分。越接近真实 agent 场景，越不能只测静态 recall。

## 对比维度

| 页面 | 主要场景 | 记忆压力 | 是否强调行动 | 是否强调持续更新 | 当前证据边界 |
| --- | --- | --- | --- | --- | --- |
| [[Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs]] | 超长对话 | 百万 token、连贯对话、多类问题 | 低 | 中 | 摘要页 |
| [[Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions]] | 增量多轮交互 | 检索、测试时学习、长程理解、选择性遗忘 | 中 | 中 | 摘要页 |
| [[MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems]] | 用户反馈模拟 | 服务期反馈学习 | 中 | 高 | 摘要页 |
| [[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]] | 连续任务流 | 经验检索、整合和更新 | 中 | 高 | 摘要页 |
| [[MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks]] | 多会话 agentic tasks | 早期经验影响后续子任务 | 高 | 高 | 摘要页 |
| [[Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey]] | 综述 | substrate、mechanism、subject taxonomy | 不适用 | 不适用 | 摘要页 |

## 分歧与适用条件

- 如果问题是“长上下文模型是否能处理超长对话”，优先看 BEAM。
- 如果问题是“记忆系统是否覆盖完整能力维度”，优先看 MemoryAgentBench。
- 如果问题是“服务期用户反馈是否能转化为能力提升”，优先看 MemoryBench。
- 如果问题是“任务流中经验是否能持续演化”，优先看 Evo-Memory。
- 如果问题是“记忆是否真正影响后续行动”，优先看 MemoryArena。

## 后续需要补充的资料

- 各 benchmark 的任务数、数据来源、记忆类型和评分指标。
- 是否包含偏好漂移、冲突信息、错误反馈和隐私约束。
- 长上下文、RAG、外部记忆、参数更新和混合系统的横向结果。

