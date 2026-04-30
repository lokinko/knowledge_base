---
title: "KnowU-Bench: Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation"
summary: 提出在线 Android 基准，评测个性化 mobile agent 的偏好获取、主动介入、同意协商和拒绝后克制
type: source-note
category: publication
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - Mobile-Agent
  - Personalization
  - Proactivity
  - Benchmark
  - Consent
  - GUI-Agent
sources:
  - "[[../sources/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]]"
links:
  paper: https://arxiv.org/abs/2604.08455
related:
  - "[[Mobile Agent Personalization]]"
  - "[[GUI Agent]]"
  - "[[Long-Horizon Agent Evaluation]]"
---

## 核心结论

KnowU-Bench 关注个性化 mobile agent 的真实助手能力：不是只完成显式 GUI 任务，而是要从行为日志中推断用户偏好，在必要时主动介入、询问同意，并在被拒绝后保持克制。

摘要给出的规模是：42 个通用 GUI 任务、86 个个性化任务和 64 个主动任务，运行在可复现 Android emulation environment 上。实验指出，即使显式任务执行强的 agent，在需要偏好推断或介入校准的模糊指令下也会跌到 50% 以下。

## 背景与问题

已有 benchmark 常把个性化简化成：

- 从静态用户历史中恢复偏好。
- 从固定上下文预测意图。
- 在已知 profile 的条件下执行任务。

KnowU-Bench 反对这种设定。它隐藏用户 profile，只暴露行为日志，并引入 LLM-driven user simulator 来支持多轮偏好澄清和主动同意处理。

## 方法、机制或主张

摘要层面可确认的评测链条包括：

- grounded GUI execution：能否在真实 GUI 环境中执行。
- preference inference：能否从行为日志推断偏好。
- consent negotiation：能否在主动帮助前协商同意。
- post-rejection restraint：被用户拒绝后能否克制继续介入。

这使 KnowU-Bench 比普通 mobile benchmark 更接近“可信个人助手”。

## 证据与限制

摘要声称，瓶颈主要不是 GUI navigation，而是 preference acquisition 和 intervention calibration。这个结论对 [[Mobile Agent Personalization]] 很关键：个人助手的难点不只是操作手机，而是判断何时、为何、以何种边界帮助用户。

限制是：当前笔记未核验任务构造、LLM-as-a-Judge 评分细则和 Claude Sonnet 4.6 之外的完整模型表。

## 与 wiki 中已有内容的关系

- [[Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents]] 关注从演示中学习显式 SOP 和隐式习惯；KnowU-Bench 关注在线评测偏好获取和主动介入。
- [[VeriOS_ Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents]] 关注不可信场景下何时向人发问；KnowU-Bench 更关注个性化、同意和主动帮助。
- [[MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation]] 主要提升执行鲁棒性，不能直接覆盖 KnowU-Bench 暴露的偏好与同意问题。

## 可复用启发

- 个性化 agent 评测应隐藏用户 profile，否则容易变成上下文查找。
- 主动性必须和同意机制一起评测，否则容易奖励过度介入。
- 拒绝后的克制应成为个人助手的核心安全指标。

## 待确认问题

- LLM-driven user simulator 是否能稳定代表真实用户偏好和拒绝行为？
- LLM-as-a-Judge 在主动性和同意场景中的一致性如何？
- 个性化任务是否覆盖长期偏好漂移？

> 来源：[[../sources/KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation.md]]

