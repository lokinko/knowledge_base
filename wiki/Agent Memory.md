---
title: "Agent Memory"
summary: Agent 在长程、多会话和用户依赖环境中积累、更新、检索、遗忘和复用信息的机制
type: concept
category: agent
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 8
confidence: medium
tags:
  - Agent Memory
  - Long-Term Memory
  - Continual Learning
  - User-Centric Memory
  - Benchmark
related:
  - "[[Agent Memory Benchmarks]]"
  - "[[Agent Continual Learning]]"
  - "[[Mobile Agent Personalization]]"
---

## 定义

Agent Memory 指 agent 在长期交互中保存并使用信息的机制。它不等于长上下文窗口，也不等于 RAG。一个可用的记忆系统至少涉及：

- 写入：何时把信息写入记忆。
- 表征：以事件、语义、程序、用户偏好或环境知识保存。
- 检索：何时、用什么条件取回。
- 更新：新反馈如何修改旧记忆。
- 遗忘：过期、错误、敏感或低价值记忆如何处理。
- 使用：记忆如何改变后续行动。

## 为什么重要

[[Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey]] 把 memory 视为 foundation agent 走向真实效用的关键能力。原因是长程、动态、用户依赖任务会持续产生 context explosion；没有记忆机制，agent 只能在单次上下文里临时拼接信息。

## 相关方法或分支

- 长对话记忆：[[Beyond a Million Tokens_ Benchmarking and Enhancing Long-Term Memory in LLMs]] 用 BEAM 和 LIGHT 评测百万 token 级长期记忆。
- 增量多轮记忆：[[Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions]] 提出 accurate retrieval、test-time learning、long-range understanding、selective forgetting 四类能力。
- 服务期反馈学习：[[MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems]] 关注从用户反馈中持续学习。
- 自演化记忆：[[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]] 关注连续任务流中的经验更新。
- 多会话行动记忆：[[MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks]] 强调记忆必须影响后续行动。

## 证据与例子

这些 sources 共同指向一个判断：记忆评测正在从“能否回忆”转向“能否在交互和行动中使用”。

- BEAM 说明百万 token context 并不自动解决长期记忆。
- MemoryAgentBench 说明四类记忆能力不能互相替代。
- MemoryArena 说明长上下文 benchmark 接近饱和的 agent，在多会话 agentic setting 中仍可能失败。
- Evo-Memory 和 MemoryBench 说明服务期学习、经验复用和用户反馈比静态 QA 更接近真实部署。

## 与其他概念的关系

- 与 [[Agent Continual Learning]]：记忆可以是外部状态更新，continual learning 也可能涉及参数更新；两者都面对新旧知识干扰。
- 与 [[Mobile Agent Personalization]]：用户偏好、行为日志和同意记录属于 user-centric memory。
- 与 [[LLM Knowledge Base]]：个人 wiki 是面向人类研究的外部长期记忆，和 agent memory 在机制上有相似处。

## 争议、边界与未解问题

- 什么时候该写入长期记忆，什么时候只保留短期工作记忆？
- 如何避免错误经验被反复检索并放大？
- 用户偏好变化后，旧记忆应被删除、降权还是标注版本？
- 记忆评测应优先衡量 recall、utility、safety 还是 cost？

## 相关页面

- [[Agent Memory Benchmarks]]
- [[Agent Continual Learning]]
- [[Mobile Agent Personalization]]
- [[LLM Knowledge Base]]

