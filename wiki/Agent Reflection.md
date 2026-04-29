---
title: "Agent Reflection"
summary: Agent 在无外部或弱外部反馈下检查、修正和恢复自身推理或执行轨迹的机制
type: concept
category: agent
status: active
created: 2026-04-22
updated: 2026-04-28
source_count: 6
confidence: medium
tags:
  - Reflection
  - Self-Correction
  - Error Recovery
  - GUI Agent
  - Reasoning
  - Decoding
related:
  - "[[GUI Agent]]"
  - "[[Long-Horizon Agent Evaluation]]"
  - "[[LLM Reasoning Decoding]]"
---

## 定义

Agent Reflection 指 agent 对自身推理、动作或轨迹进行检查和修正的机制。它可以发生在不同粒度：

- 单步动作后。
- 一段轨迹后。
- 任务结束前。
- 多个候选解之间。
- 人类或环境反馈后。
- 多条采样 reasoning path 的最终答案之间。

## 为什么重要

长程任务中，错误通常不是一次性出现，而是逐步累积。没有反思机制，agent 容易陷入重复动作、提前终止、错误恢复失败或对自身答案过度自信。

## 相关方法或分支

- 多视角对比：[[Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives]] 不直接让模型自评，而是生成不同视角，比较差异并形成 checklist。
- 层级反思：[[MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation]] 将 mobile GUI 反思拆为 action、trajectory、global 三层。
- 知识对齐摘要：[[ColorBrowserAgent_ Complex Long-Horizon Browser Agent with Adaptive Knowledge Evolution]] 用 progressive summarization 稳定长交互。
- human query：[[VeriOS_ Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents]] 把不可信场景下的向人发问作为风险控制机制。
- 多路径答案一致性：[[Self-Consistency Improves Chain of Thought Reasoning in Language Models]] 在解码阶段生成多条 reasoning path，用最终答案一致性替代单条 greedy path。
- 局部候选修正：[[Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement]] 在动作失败后移除候选并重新决策，属于更局部的 retrospection。

## 证据与例子

当前资料共同支持一个判断：反思不是越多越好，而是要控制触发条件和信息来源。

- Self-Contrast 说明直接自评可能过度自信或随机，分歧对比能产生更可靠反馈。
- MobileUse 说明每步都反思可能带来额外延迟和错误反馈，因此使用 reflection-on-demand。
- ColorBrowserAgent 说明长程浏览任务需要压缩和对齐历史知识，否则决策漂移会累积。
- Self-Consistency 说明，对固定答案推理任务，多条推理路径的一致答案比单条最高概率推理链更可靠。
- RecAgent 说明，GUI agent 的“反思”有时不需要重审完整轨迹，只需要围绕候选组件做局部修正。

## 与其他概念的关系

- 与 [[Agent Memory]]：反思结果可能写入记忆，但错误反思也可能污染记忆。
- 与 [[GUI Agent]]：GUI 反思要处理视觉状态、动作 grounding 和任务完成验证。
- 与 [[Long-Horizon Agent Evaluation]]：长程 benchmark 更容易暴露反思缺失。
- 与 [[LLM Reasoning Decoding]]：多路径解码和 agent 反思都利用候选差异，但前者发生在答案生成阶段，后者发生在执行或决策控制阶段。

## 争议、边界与未解问题

- 反思触发信号应来自模型置信度、环境反馈、轨迹异常还是人类查询？
- checklist、critique、trajectory summary 哪种中间产物最稳定？
- 反思调用成本和成功率提升之间如何权衡？
- 反思失败是否需要被记录为 memory 中的负样本？
- 固定答案任务中的答案一致性，能否迁移为 GUI agent 的终态一致性或动作一致性？

## 相关页面

- [[Self-Contrast_Better Reflection Through Inconsistent Solving Perspectives]]
- [[MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation]]
- [[ColorBrowserAgent_ Complex Long-Horizon Browser Agent with Adaptive Knowledge Evolution]]
- [[Self-Consistency Improves Chain of Thought Reasoning in Language Models]]
- [[Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement]]
