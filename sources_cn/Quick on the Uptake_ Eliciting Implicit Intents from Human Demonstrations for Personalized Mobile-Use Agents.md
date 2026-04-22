---
title: "Quick on the Uptake: Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents"
summary: 通过显式 SOP 与隐式习惯库双通道建模，让 mobile-use agent 更贴近具体用户的真实意图
date: 2025-08-08
category: publication
badge: arXiv'25
authors:
  - Zheng Wu
  - Heyuan Huang
  - Yanjia Yang
  - et al.
tags:
  - Mobile-Agent
  - Personalization
  - Demonstration-Learning
  - Intent
links:
  论文: https://arxiv.org/abs/2508.08645
  代码: https://github.com/MadeAgents/Quick-on-the-Uptake
---

## 研究问题

人类演示学习已经能帮助移动 agent 学到“该按哪些步骤完成任务”，但作者指出，这类方法大多只覆盖了 `explicit intention flow`，也就是外显步骤序列，却忽略了 `implicit intention flow`：

- 用户偏好
- 习惯性选择
- 对模糊请求的个性化解释

因此，现有方法虽然可能把任务做完，却不一定“按这个用户真正想要的方式做完”。本文要解决的，就是如何从人类演示中同时恢复显式意图和隐式意图。

## 核心思路

作者提出 `IFRAgent`，其全称是 `Intention Flow Recognition from human demonstrations`。这套方法不把演示只当成动作监督，而是把演示拆成两条知识流：

- 显式意图流：可提炼成 SOP
- 隐式意图流：可沉淀成用户习惯表示

再用这两部分共同驱动个性化 mobile-use agent。

## 方法结构

### 1. MobileIAR：新增“意图对齐”评测目标

作者首先构建 `MobileIAR` 数据集。它不只记录 ground-truth action list，还额外提供 `user-intent-aligned actions`，从而可以评估 agent 是否真的按用户意图执行。

这使论文从一开始就不再只看 success rate，而是引入 `intent alignment rate` 作为更贴近个性化代理目标的指标。

### 2. 显式意图流：构建 query-level SOP 库

在 `intention flow extraction` 阶段，IFRAgent 先分析人类演示中的显式意图流，提取出与 query 对应的标准操作流程 `SOP`。

随后：

- query 被编码成向量；
- 与对应 SOP 一起存入 query-level 向量库；
- 部署时可检索相近 query 的 SOP 作为 few-shot/RAG 支持。

这一部分承担的是“显式步骤知识复用”。

### 3. 隐式意图流：构建 user-level habit repository

与此同时，系统还会从同一批人类演示中分析 `implicit intention flow`，逐步更新用户级 `habit repository`。

作者把它理解为对用户潜在行为模式的增量学习，用于建模：

- 这个用户偏好怎样的操作路径；
- 面对模糊 query 时更可能想要哪种解释；
- 某些步骤上更偏好哪类策略。

这一部分承担的是“个性化习惯建模”。

### 4. 部署阶段：SOP Extractor + Query Rewriter

在部署时，IFRAgent 主要依赖两个组件：

- `SOP Extractor`：结合 query、检索到的 SOP 示例和上下文，产出当前 query 对应的 SOP；
- `Query Rewriter`：再将 SOP 与用户 habit repository 结合，生成更符合该用户意图的个性化 query 和 SOP。

作者特别说明，这两个部署组件可以做成边缘侧可部署模型；其中通用知识更多由前面的 few-shot + RAG 补足。

## 主要结果

### 1. Intent alignment rate 平均提升 6.79%

根据论文正文，IFRAgent 在多个 mobile-use agent、不同语言和不同构造方式下，平均带来 `6.79%` 的 `intent alignment rate` 提升，对应 `28.80%` 相对提升。

这意味着它提升的不只是“做成了”，而是“更按用户想要的方式做成了”。

### 2. Task completion / step completion 也同步提升

除了意图对齐，论文还报告：

- 平均 `task completion rate` 提升 `5.30%`
- 另一个摘要版本中报告 `step-wise success rate` / step completion 也有约 `5.50%` 左右提升

这说明个性化建模并不是以牺牲执行能力为代价，反而能带来整体任务表现的同步提升。

### 3. 通用大模型获益更明显

作者还指出，`Qwen2.5-VL`、`GPT-4o` 等通用模型从 IFRAgent 中获得的提升，比一些专门的 mobile-use base model 更明显。

一个合理推断是：通用模型本身具备更强表达和推理能力，但缺少用户级意图约束；一旦补上显式 SOP 和隐式习惯信息，就更容易把能力转化成个性化执行。

## 与相关文档的对照理解

结合知识库中另外 3 篇相近文档，可以更清楚地看出这篇工作的意义：

- `KnowU-Bench` 评测的是交互式偏好推断和主动个性化决策；本文更关注如何从已有的人类演示中恢复显式与隐式意图，属于个性化建模方法。
- `MobileUse` 关注长程执行鲁棒性；Quick on the Uptake 关注的是“执行前 query 的个性化解释”与“执行风格的用户对齐”。
- `LaMP` 是语言模型层面的 personalization benchmark；本文把个性化问题带到 GUI mobile agent 场景，并引入了意图对齐率这一更贴近操作代理的指标。

## 可复用启发

- 演示学习不应只抽取步骤监督，还应显式区分 SOP 级显式意图和用户习惯级隐式意图。
- 个性化 agent 的评测指标不能只停留在成功率，还要看与用户真实意图的对齐程度。
- 外显流程库和隐式习惯库可以分层建模、分角色使用，而不必混成一个大 memory。
- 通用模型加个性化意图约束，可能比继续专门微调专用代理更有性价比。

## 局限与边界

- 本笔记主要依据 arXiv 摘要页与 HTML 正文整理，未逐项展开 MobileIAR 的数据构造细节。
- IFRAgent 依赖高质量人类演示，若演示本身带噪或不稳定，个性化习惯库可能被污染。
- 该方法主要面向个性化意图识别与重写，不直接解决长程执行中的错误恢复问题。

## 结论

Quick on the Uptake 的关键贡献，在于把人类演示中的“外显步骤”和“隐式偏好”拆开建模。通过 SOP 库与用户 habit repository 双通道，IFRAgent 让 mobile-use agent 不仅更会做事，也更懂“这个用户想让我怎么做”。对个性化代理来说，这比单纯继续堆演示数据更接近真正的用户对齐。

> 来源：[[Quick on the Uptake_ Eliciting Implicit Intents from Human Demonstrations for Personalized Mobile-Use Agents]]
