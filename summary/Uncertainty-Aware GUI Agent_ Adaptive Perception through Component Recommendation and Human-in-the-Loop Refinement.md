---
title: "Uncertainty-Aware GUI Agent: Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement"
summary: RecAgent 把 GUI agent 失败拆成感知不确定性和决策不确定性，分别用组件推荐和人类在环澄清来降低输入冗余与意图歧义。
type: source-note
category: publication
status: active
created: 2026-04-28
updated: 2026-04-28
source_count: 1
confidence: medium
tags:
  - GUI Agent
  - Mobile Agent
  - Human-in-the-Loop
  - Uncertainty
  - Benchmark
sources:
  - "[[../sources/arXiv/Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement.md]]"
links:
  paper: https://arxiv.org/abs/2508.04025
  html: https://arxiv.org/html/2508.04025v1
  code: https://github.com/Fanye12/RecAgent
assets:
  - "../sources/media/recagent-overview.png"
related:
  - "[[GUI Agent]]"
  - "[[Agent Reflection]]"
---

## 核心结论

RecAgent 的核心判断是：GUI agent 的错误并不都来自规划失败，一部分来自屏幕元素太多带来的感知不确定性，另一部分来自用户任务含糊带来的决策不确定性。两类不确定性需要不同机制处理。

## 背景与问题

移动 GUI 页面可能包含几十到数百个 UI 元素。把完整屏幕信息直接交给 agent 会引入大量无关组件，导致目标定位变难。同时，许多真实任务本身并不完整，例如“点一杯咖啡”没有说明规格、冷热、甜度或品牌偏好，agent 不能只靠默认选项替用户决定。

## 方法、机制或主张

RecAgent 把系统拆成几个关键模块：

- `Component Recommendation Module`：从 GUI 元素中筛出与任务最相关的组件，降低输入冗余。
- `Decision Agent`：基于推荐组件做动作选择。
- `Reflection/Retrospection Mechanism`：当动作失败或选中元素不合适时，移除相关候选并重新决策。
- `Interaction Agent`：在意图含糊或高不确定场景下主动询问用户反馈。
- `Memory Unit`：记录子目标、动作、描述、成功指标、摘要、查询和用户反馈。

论文还提出 `ComplexAction` 数据集，专门评估复杂 GUI 场景中的单步动作成功率。其目标不是完整端到端任务，而是测 agent 能否在冗余屏幕中定位并执行指定动作。

## 证据与限制

论文报告组件推荐可以把输入元素从数十甚至数百个缩减到少数相关元素。消融结果显示，Component Recommendation Module 和 Retrospection Mechanism 单独使用都有有限收益，组合后 AndroidWorld 成功率达到 47.8%；在 ComplexAction 中，三种推荐路径组合达到 69.3%。

信息边界：当前笔记依据 arXiv 摘要页和 HTML 正文整理，未验证 GitHub 仓库实现、ComplexAction 数据量细节和人工标注协议。

## 与 wiki 中已有内容的关系

- 与 [[GUI Agent]]：RecAgent 提供了“先降低观测复杂度，再决策”的 GUI agent 设计路线。
- 与 [[Agent Reflection]]：它的 retrospection 更像局部候选修正，而不是完整轨迹反思。
- 与 [[Mobile Agent Personalization]]：Interaction Agent 询问用户偏好，但论文重点仍是任务歧义消解，不是长期用户画像。
- 与 [[Long-Horizon Agent Evaluation]]：ComplexAction 是复杂场景单步动作 benchmark，可补足长程 benchmark 对单步 grounding 错误来源的定位。

## 可复用启发

- GUI agent 不应总是把全屏所有元素喂给决策器；先做相关组件推荐可以降低噪声。
- 对决策不确定性，向用户澄清比随机选择或默认选择更稳。
- 单步动作 benchmark 可以用于诊断长程任务中具体的感知和 grounding 瓶颈。

## 待确认问题

- 组件推荐的召回错误是否会屏蔽真正目标，从而让后续决策无法恢复？
- ComplexAction 是否覆盖海外 app、不同语言界面和动态内容？
- Interaction Agent 的询问频率如何控制，才能避免把不确定性转化为用户负担？

> 来源：[[../sources/arXiv/Uncertainty-Aware GUI Agent_ Adaptive Perception through Component Recommendation and Human-in-the-Loop Refinement.md]]
