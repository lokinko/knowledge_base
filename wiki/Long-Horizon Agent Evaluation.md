---
title: "Long-Horizon Agent Evaluation"
summary: 面向长步骤、多状态、多路径和跨会话任务的 agent 评测问题，重点是复现性、路径多样性、记忆依赖和错误累积
type: concept
category: benchmark
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 10
confidence: medium
tags:
  - Benchmark
  - Long-Horizon
  - GUI Agent
  - Agent Memory
  - Web Navigation
related:
  - "[[GUI Agent]]"
  - "[[Agent Memory Benchmarks]]"
---

## 定义

Long-Horizon Agent Evaluation 评测 agent 在长步骤任务中的规划、执行、记忆和恢复能力。它不同于单轮 QA 或短链工具调用，因为失败可能来自：

- 可行路径稀疏。
- 状态观测噪声。
- 多条正确路径。
- 中间错误累积。
- 跨会话信息依赖。
- 任务完成判断错误。

## 为什么重要

真实 GUI、web 和个人助手任务通常不是单步完成。短 benchmark 容易高估 agent 能力，因为它不暴露长期上下文管理、轨迹偏航和恢复问题。

## 相关方法或分支

- 图结构移动 benchmark：[[ColorBench_ Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks]]。
- 语义计划搜索：[[Plan-MCTS_ Plan Exploration for Action Exploitation in Web Navigation]]。
- 层级反思执行：[[MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation]]。
- 自适应 milestone reward：[[Adaptive Milestone Reward for GUI Agents]]。
- 多会话记忆任务：[[MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks]]。
- 个性化在线评测：[[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]]。

## 证据与例子

ColorBench 直接指出静态 benchmark 的 golden path 假设不足，动态真机测试又难复现。MemoryArena 则从记忆角度说明，如果子任务之间有依赖，传统 recall benchmark 不能评估记忆的行动效用。

## 与其他概念的关系

- 与 [[GUI Agent]]：长程 GUI 任务是该问题的主要来源。
- 与 [[Agent Memory]]：跨会话和跨任务依赖需要长期记忆。
- 与 [[Agent Reflection]]：长程任务需要反思发现偏航和提前终止。
- 与 [[Mobile Agent Personalization]]：个性化评测增加了用户偏好和同意维度。

## 争议、边界与未解问题

- 如何在静态 benchmark 中合理表示多条正确路径？
- 如何区分“操作失败”“计划失败”“记忆失败”和“用户建模失败”？
- LLM-as-a-Judge 是否适合评估同意、克制和主动性？
- 长程 benchmark 的成本如何控制？

## 相关页面

- [[ColorBench_ Benchmarking Mobile Agents with Graph-Structured Framework for Complex Long-Horizon Tasks]]
- [[Plan-MCTS_ Plan Exploration for Action Exploitation in Web Navigation]]
- [[MemoryArena_ Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks]]

