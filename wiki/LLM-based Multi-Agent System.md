---
title: "LLM-based Multi-Agent System"
summary: 由多个 LLM agent 通过协议、路由、记忆、工具和激励机制协作形成的智能系统
type: concept
category: system
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - Multi-Agent
  - Protocol
  - Tool Use
  - Privacy
  - Credit Allocation
related:
  - "[[LLM-based Multi-Agent Systems_ Techniques and Business Perspectives]]"
  - "[[Function Calling]]"
  - "[[Agent Memory]]"
assets:
  - ../public/pictures/lamas-illustration-of-mas.png
  - ../public/pictures/lamas-protocol-hierarchy.png
  - ../public/pictures/lamas-topology.png
---

## 定义

LLM-based Multi-Agent System 是由多个 LLM agent 组成的协作网络。[[LLM-based Multi-Agent Systems_ Techniques and Business Perspectives]] 将其称为 LaMAS，并把它从单 agent 工具调用扩展为带通信、协作、记忆、隐私和商业激励的系统。

## 为什么重要

当工具和服务逐步 agent 化，系统不再只是“一个模型调用很多 API”，而可能变成“多个拥有不同数据、能力和目标的 agent 协作”。这会带来新的问题：

- 如何发现和路由合适 agent。
- 如何形成共识。
- 如何保护各参与方数据。
- 如何分配贡献和收益。
- 如何共享经验又避免污染。

## 相关方法或分支

LaMAS 文中提出五类协议：

- instruction processing protocol。
- message exchange protocol。
- consensus formation protocol。
- credit allocation protocol。
- experience management protocol。

其中 credit allocation 和 experience management 尤其重要，因为它们把多智能体系统从通信架构提升为可持续生态。

## 图示资产

- [[../public/pictures/lamas-illustration-of-mas.png]]：LaMAS 整体示意图。
- [[../public/pictures/lamas-protocol-hierarchy.png]]：协议层级图。
- [[../public/pictures/lamas-topology.png]]：topology 图。

## 证据与例子

当前本库只有一篇 LaMAS source-note，属于体系性和前瞻性分析，不是实验 benchmark。因此本页只沉淀其系统设计框架，不把商业生态判断写成已验证事实。

## 与其他概念的关系

- 与 [[Function Calling]]：当工具变成 autonomous agents，函数选择扩展为 agent routing。
- 与 [[Agent Memory]]：多 agent 系统需要 experience management 和跨 agent 学习。
- 与 [[Mobile Agent Personalization]]：个人助手 agent 网络会放大隐私和授权问题。

## 争议、边界与未解问题

- 多 agent credit allocation 如何验证公平性？
- 去中心化 agent 协作如何防止 prompt injection 和 memory poisoning 传播？
- 参与方数据不出域时，编排器能获得多少必要状态？

## 相关页面

- [[LLM-based Multi-Agent Systems_ Techniques and Business Perspectives]]
- [[Function Calling]]
- [[Agent Memory]]
