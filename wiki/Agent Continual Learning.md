---
title: "Agent Continual Learning"
summary: Agent 在持续接收新任务、新反馈和新环境时更新知识，同时避免灾难性遗忘的能力
type: concept
category: agent
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 4
confidence: medium
tags:
  - Continual Learning
  - Agent Memory
  - Stability-Plasticity
  - Parameter Fusion
  - Test-Time Learning
related:
  - "[[Agent Memory]]"
---

## 定义

Agent Continual Learning 指 agent 在持续接触新任务、新反馈、新环境时更新能力，同时避免旧能力被破坏。它可以发生在不同层：

- 参数层：通过微调、task vector 或参数融合更新模型。
- 记忆层：通过外部记忆写入和检索积累经验。
- 策略层：通过反馈调整动作选择、查询人类或工具调用策略。

## 为什么重要

真实 agent 不会只面对固定 benchmark。它需要在服务期持续吸收用户反馈、任务经验和环境变化。核心矛盾是 stability-plasticity：既要学新东西，又不能忘旧能力。

## 相关方法或分支

- [[Agent-Dice_ Disentangling Knowledge Updates via Geometric Consensus for Agent Continual Learning]] 用几何共识过滤和曲率加权融合 task vectors，缓解参数更新中的冲突知识。
- [[MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems]] 用用户反馈模拟评测服务期学习。
- [[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]] 从外部记忆自演化角度评测 test-time learning。
- [[Rethinking Memory Mechanisms of Foundation Agents in the Second Half_ A Survey]] 提供 memory operations learning policies 的背景。

## 证据与例子

Agent-Dice 把稳定性-可塑性困境归因于未区分任务共享知识和任务特异冲突知识。MemoryBench 和 Evo-Memory 则说明，即使不更新参数，外部记忆系统也要面对持续写入、经验复用和错误传播。

## 与其他概念的关系

- 与 [[Agent Memory]]：外部记忆是 continual learning 的低风险路径之一，但会引入检索和遗忘问题。
- 与 [[Mobile Agent Personalization]]：用户偏好会变化，个性化 agent 必须持续学习。
- 与 [[Function Calling]]：工具集合变化和参数 schema 变化也会形成持续适应压力。

## 争议、边界与未解问题

- 参数更新和外部记忆更新应如何分工？
- 如何判断新知识是共享知识、任务特异知识还是冲突知识？
- continual learning 是否应默认需要人类审核或回滚机制？

## 相关页面

- [[Agent-Dice_ Disentangling Knowledge Updates via Geometric Consensus for Agent Continual Learning]]
- [[MemoryBench_ A Benchmark for Memory and Continual Learning in LLM Systems]]
- [[Evo-Memory_ Benchmarking LLM Agent Test-time Learning with Self-Evolving Memory]]

