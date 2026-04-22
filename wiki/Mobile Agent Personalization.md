---
title: "Mobile Agent Personalization"
summary: Mobile agent 根据用户历史、演示、行为日志和实时互动推断偏好，并在 GUI 环境中校准主动帮助边界
type: concept
category: agent
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 4
confidence: medium
tags:
  - Mobile Agent
  - Personalization
  - User Preference
  - Proactivity
  - Consent
  - Intent
related:
  - "[[GUI Agent]]"
  - "[[Agent Memory]]"
---

## 定义

Mobile Agent Personalization 是让移动端 agent 结合用户偏好、习惯、演示轨迹和实时互动来执行任务。它不只是“更准确点击界面”，还包括：

- 推断用户隐式意图。
- 从行为日志中获取偏好。
- 在需要时主动提议帮助。
- 主动前询问同意。
- 用户拒绝后保持克制。

## 为什么重要

[[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]] 的摘要指出，强 GUI 执行 agent 在需要偏好推断或介入校准时仍会显著退化。这说明个人助手能力的瓶颈不只是 navigation，而是用户建模与交互边界。

## 相关方法或分支

- 文本个性化基准：[[LaMP_ When Large Language Models Meet Personalization]] 用用户 profile 检索增强个性化文本任务。
- 演示中隐式意图：[[Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents]] 将显式 SOP 与隐式习惯库结合。
- 在线个性化评测：[[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]] 隐藏用户 profile，通过行为日志和用户模拟器评测偏好获取与主动性。
- 不可信场景查询：[[VeriOS_ Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents]] 关注 agent 何时应向人发问。

## 证据与例子

当前资料形成一个递进关系：

- LaMP 证明 profile retrieval 对个性化语言任务有用。
- Quick on the Uptake 把个性化带到 mobile-use agent，通过 human demonstrations 抽取 SOP 和 habit repository。
- KnowU-Bench 进一步要求 agent 在 live GUI environment 中主动澄清偏好、处理同意和拒绝。
- VeriOS 提供可信 OS agent 的 query-driven 人类介入视角。

## 与其他概念的关系

- 与 [[Agent Memory]]：偏好、习惯、同意历史和行为日志都属于 user-centric memory。
- 与 [[GUI Agent]]：个性化 agent 必须先能稳定执行 GUI 任务，但执行能力不等于个性化能力。
- 与 [[Long-Horizon Agent Evaluation]]：偏好获取和主动性往往需要跨多轮、多步骤评测。

## 争议、边界与未解问题

- 用户 profile 应如何隐藏、更新和删除？
- agent 何时应该主动介入，何时应该保持沉默？
- LLM-driven user simulator 能否代表真实用户的偏好表达和拒绝行为？
- 个性化收益如何和隐私风险一起评估？

## 相关页面

- [[KnowU-Bench_ Towards Interactive, Proactive, and Personalized Mobile Agent Evaluation]]
- [[Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents]]
- [[LaMP_ When Large Language Models Meet Personalization]]
- [[VeriOS_ Query-Driven Proactive Human-Agent-GUI Interaction for Trustworthy OS Agents]]

