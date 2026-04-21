---
title: Adaptive Milestone Reward for GUI Agents
summary: 通过可验证、可演化的 milestone 奖励和非对称 credit assignment，缓解长程 GUI 强化学习中的时序 credit assignment 问题
date: 2026-02-11
category: publication
badge: arXiv'26
authors:
  - Congmin Zheng
  - Xiaoyun Mo
  - Xinbei Ma
  - et al.
tags:
  - GUI-Agent
  - Reinforcement-Learning
  - Reward
  - Long-Horizon
links:
  论文: https://arxiv.org/abs/2602.11524
---

## 研究问题

移动 GUI agent 的强化学习训练，长期受制于一个老问题：长程任务里的 `temporal credit assignment` 很难做准。

已有奖励机制通常卡在两难之间：

- `outcome reward` 可验证性强，但只有最终成败信号，太稀疏。
- `process reward` 更密集，但常依赖黑盒打分，容易带来偏差和 `reward hacking`。

本文要解决的核心矛盾是：能否在保持奖励高保真、可验证的前提下，给 agent 更密集、更有指导性的训练信号。

## 核心思路

本文提出 `ADMIRE`，即 `Adaptive Milestone Reward`。它的关键想法不是直接为每一步动作打分，而是先从成功轨迹中抽取出若干“关键状态转移”，把它们定义为 `milestone`，再围绕 milestone 做奖励分配。

这套设计强调两点：

- milestone 必须是可验证的，而不是纯主观生成的过程评价。
- milestone 不是静态模板，而是会随着策略进步而动态更新。

因此，ADMIRE 试图把“稀疏但真实”的最终结果奖励，转换成“稠密但仍然可信”的中间进度奖励。

## 方法结构

### 1. Adaptive Milestone Generation

ADMIRE 会从成功轨迹中抽象出关键 checkpoint，例如完成某个关键页面切换、点中某个核心入口等，把它们作为奖励锚点。

和静态 sub-goal 不同，本文强调 milestone 是 `adaptive` 的：

- 初始 milestone 从成功探索轨迹中提炼。
- 如果后续训练发现了更优的完成路径，milestone 也会跟着更新。

如果 agent 后来学会了更高效的捷径，奖励机制也必须跟着迁移，否则就会持续鼓励已经过时的操作方式。

### 2. Semantic Matching and Verification

生成 milestone 之后，系统需要判断某一步是否真正命中了 milestone。ADMIRE 在这里采用语义匹配加规则验证的做法，用来确保奖励触发不仅“像”，而且尽量“真”。

这一步的重要性在于，它把 process reward 里最容易失真的环节换成了更接近规则验证的结构化匹配。

### 3. Asymmetric Credit Assignment

这是 ADMIRE 最关键的设计之一。不对成功和失败轨迹使用同一种奖励分配方式，而是做了 `asymmetric` 处理：

- 对成功轨迹，只给真正命中 milestone 的关键步骤正奖励，尽量去掉冗余动作带来的噪声。
- 对失败轨迹，则通过中间 milestone 提供部分信用，形成探索脚手架，避免“全错就全零”的极端稀疏反馈。

这样可以同时做到：

- 对成功经验做去噪，逼着模型学关键决策点；
- 对失败经验保留中间有效信息，降低探索门槛。

## 主要结果

### 1. AndroidWorld 上稳定超过 10% 绝对提升

根据论文摘要和正文，ADMIRE 在 AndroidWorld 上对不同 base model 都带来 `10% 以上` 的 success rate 绝对提升。

正文里一个代表性结果是：

- `ADMIRE (Qwen2.5-VL-7B)` 达到 `44.0%` success rate；
- 超过了更大的 `Qwen2.5-VL-72B`，也超过了一些闭源或强基线模型。

这说明它带来的增益主要来自奖励机制，而不是单纯换更大的底模。

### 2. 不只对移动 GUI，有跨域泛化能力

ADMIRE 没有停留在 AndroidWorld，同时将该方案扩展到：

- `ALFWorld`
- `WebShop`

实验显示，ADMIRE 在不同 RL 算法下都能带来一致收益。例如：

- 在 `GRPO` 下，WebShop 达到 `81.9%`，ALFWorld 达到 `78.1%`
- 在 ALFWorld 上，`RLOO-ADMIRE` 达到 `84.4%`
- 与 `DAPO` 结合后进一步达到 `87.5%`

这说明 adaptive milestone 不是只适用于手机 GUI，而是一种更通用的长程 agent 奖励构造思路。

### 3. 它本质上是一种算法无关的 reward 结构

论文明确强调，ADMIRE 可以与 `GRPO`、`RLOO`、`DAPO` 等不同优化算法结合，并且都能获益。这意味着它更像是一个 reward mechanism，而不是绑定某种特定 RL pipeline 的专用技巧。

## 与相关文档的对照理解

结合知识库中另外 3 篇相近文档，可以更清楚地看出 ADMIRE 的位置：

- `MobileUse` 通过层级反思和主动探索提升 GUI 执行鲁棒性；ADMIRE 关注的是训练期奖励信号设计，两者分别作用于推理时策略结构和训练时学习信号。
- `ColorBench` 提供复杂长程移动任务的诊断型 benchmark；ADMIRE 则更像是针对这类长程任务训练 agent 的一套奖励机制。
- `Agent-Dice` 解决的是持续学习中的参数更新冲突；ADMIRE 解决的是强化学习中的信用分配问题，二者分别对应“学什么别忘”和“每步该怎么奖”。

因此，ADMIRE 更适合作为长程 GUI agent 的训练基础设施，而不是执行时的推理框架。

## 可复用启发

- 对长程任务，奖励设计不应只在 outcome reward 和 process reward 间二选一，可以通过可验证 milestone 取得中间路线。
- 奖励锚点如果不随策略演化更新，很容易反过来束缚模型继续学更优路径。
- 成功轨迹和失败轨迹不应使用完全对称的 credit assignment 逻辑。
- 如果奖励机制足够稳健，它应当能跨任务域和跨 RL 算法复用，而不是只在单一 benchmark 生效。

## 局限与边界

- 本笔记主要依据 arXiv 摘要页与 HTML 正文整理，未逐项复核附录中的所有超参数和效率数据。
- ADMIRE 依赖 milestone 抽取与匹配质量，如果 milestone 生成质量下降，奖励可靠性也会受影响。
- 它解决的是信用分配，而不是高层规划、记忆管理或个性化交互问题。

## 结论

ADMIRE 的关键贡献，在于把 GUI agent 强化学习中的“密集信号 vs. 高保真信号”冲突，改写成“围绕可验证 milestone 做自适应奖励设计”的问题。通过动态 milestone 和非对称 credit assignment，它既保留了规则型奖励的可信度，又提供了足够密的学习信号，是一种比传统 outcome/process reward 更平衡的长程训练方案。

> 来源：[[Adaptive Milestone Reward for GUI Agents]]
