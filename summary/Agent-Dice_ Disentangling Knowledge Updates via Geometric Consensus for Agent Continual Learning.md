---
title: "Agent-Dice: Disentangling Knowledge Updates via Geometric Consensus for Agent Continual Learning"
summary: 通过几何共识过滤和曲率加权融合 task vector，缓解 agent continual learning 中的稳定性-可塑性困境
date: 2026-01-03
category: publication
badge: ACL'26 Findings
authors:
  - Zheng Wu
  - Xingyu Lou
  - Xinbei Ma
  - et al.
tags:
  - Continual-Learning
  - Agent
  - Parameter-Fusion
  - Tool-Use
links:
  论文: https://arxiv.org/abs/2601.03641
  代码: https://github.com/Wuzheng02/Agent-Dice
---

## 研究问题

LLM agent 一旦进入真实环境，就不再只是回答问题，而是需要持续适应新的任务、应用和工具域。问题在于，连续学习新任务时，模型很容易出现经典的 `stability-plasticity dilemma`：

- 如果过分保守，就学不会新任务。
- 如果过分激进，就会遗忘旧任务，出现 catastrophic forgetting。

本文把问题进一步具体化到 agent 场景：GUI agent 和 tool-use agent 的新知识更新，并不总是互相兼容。真正的困难不是“如何不断训练”，而是“如何区分跨任务共享的共通知识，以及任务之间互相冲突的干扰知识”。

因此，很多持续学习失败，本质上都来自没有显式拆开这两类更新。

## 核心思路

Agent-Dice 不是继续走传统的 replay、memory module 或顺序微调路线，而是把每个任务学到的参数更新视为 `task vector`，然后做一次受约束的参数融合。

它的核心目标是：

- 把方向上互相冲突的更新先过滤掉，保证稳定性。
- 再把多个任务都支持的共享更新增强起来，保证可塑性。

换句话说，Agent-Dice 试图把“学新任务”改写成“对多个任务更新做共识提纯”。

## 方法结构

### 1. 基本表示：把任务学习结果表示为 task vector

每个新任务训练后，都会得到一个相对基座模型的参数更新向量。Agent-Dice 不直接顺序叠加这些向量，而是逐参数地判断：

- 哪些更新方向在多个任务之间是一致的；
- 哪些更新只是局部噪声或跨任务冲突。

因此，它处理的是“参数空间中的更新几何关系”，而不是单纯把多个 checkpoint 做平均。

### 2. 第一阶段：Geometric Consensus Filtering

第一阶段做几何共识过滤。先在每个参数维度上看不同任务更新的方向符号，利用多数投票识别“主导优化方向”，然后把与主导方向冲突的更新排除掉。

这一步的作用很直接：

- 先把明显互相打架的更新去掉；
- 避免少数冲突梯度破坏整体知识保留；
- 让最终更新尽量留在“真实共享梯度”的方向锥内。

论文把这一步解释为对 outlier update 的剪枝，用来降低 destructive interference。

### 3. 第二阶段：Curvature-based Importance Weighting

在过滤掉冲突方向后，第二阶段再决定剩余更新谁更重要。把更新幅度看作局部损失曲率或参数敏感度的代理指标，用 masked softmax 为保留下来的任务更新分配权重。

这一步对应的直觉是：

- 并不是所有共识方向都同等重要；
- 更新幅度更大、曲率更高的位置，往往意味着该参数对当前任务更敏感；
- 因此应该在共识集合内部再做一次 saliency-aware 加权。

最终，Agent-Dice 得到的是一个“先去冲突、再按重要性重加权”的融合更新。

## 理论主张

本文不是纯经验方法，还试图从优化角度解释这个融合策略为什么合理。论文的理论部分主要服务于两点：

- 说明多数方向过滤可以降低错误融合到冲突更新的概率；
- 说明基于 saliency 的 softmax 权重可以视为满足约束下的最大熵分配。

这些分析的作用不是给出完整学习理论，而是为其参数融合规则提供一个较清晰的优化解释：Agent-Dice 不是经验拼装，而是试图把“共识方向”和“参数重要性”统一进同一个融合框架。

## 实验设置

论文在两个 agent 域上验证方法：

- GUI agent 域：使用 `AITZ`、`AndroidControl`、`GUI-Odyssey`
- tool-use agent 域：使用 `ToolACE` 并切成 4 个子集

评测方式模拟持续学习过程：任务逐步加入，比较零样本、各任务单独训练、顺序持续训练以及 Agent-Dice 融合后的表现。

基座模型方面：

- GUI agent：`OS-Atlas-Pro-7B`、`Qwen3-VL-8B`
- tool-use agent：`Qwen3-8B`、`Llama-3.1-8B`

## 主要发现

### 1. Agent-Dice 在两个域上都优于传统持续学习流程

论文总结指出，在 GUI agent 和 tool-use agent 两个域中，Agent-Dice 都取得最高的 `AvgZ`，说明它在增量学习场景下整体优于传统 lifelong-learning 做法。

`learn from all` 并不总是第二好，这反过来说明：只要顺序引入新知识，旧知识就有可能被破坏，持续训练本身并不能自动解决遗忘问题。

### 2. GUI agent 域中的 catastrophic forgetting 更明显

在 GUI 域中，不同 benchmark 涉及的 app 分布差异很大，所以跨任务冲突尤其明显。论文明确提到，当模型接触 `GUI-Odyssey` 这类新知识时，会明显遗忘 `AITZ` 和 `AndroidControl` 相关能力。

Agent-Dice 的优势在于：

- 能明显回收旧数据集上的表现；
- 同时只在最新任务上带来较小代价；
- 比单纯把三个数据集顺序学完更稳。

这说明它更擅长处理“应用空间差异大、任务行为分布不一致”的 agent 场景。

### 3. Tool-use 域中，方法对共享机制更敏感

论文指出，在 tool-use agent 域里，不同任务之间的调用机制差异相对更小，因此共通知识更容易被识别出来。也正因为如此，Agent-Dice 在这个域中从“共识强化 + 噪声过滤”里得到的收益更明显。

对两种不同基础情形都有效：

- 原本就有较强 tool-use 能力的模型，如 `Qwen3-8B`
- 原本 tool-use 能力较弱的模型，如 `Llama-3.1-8B`

### 4. 两阶段设计都不可缺

消融实验显示：

- 去掉第一阶段的几何共识过滤，模型无法稳定学到跨任务共享知识；
- 去掉第二阶段的曲率加权，更新幅度会变得过大且不稳定，性能显著下降。

因此，Agent-Dice 的效果不是来自简单融合，而是来自“过滤冲突”和“放大共享”这两个动作同时成立。

### 5. 额外开销很低

在附加开销分析里，论文给出一个很实用的结论：平均来看，Agent-Dice 只需要大约 `1` 分钟 GPU 时间，或者约 `10` 分钟 CPU 时间，就可以完成融合。

这意味着它更接近一种轻量级后处理式持续学习机制，而不是一套高成本重训练方案。

## 与相关文档的对照理解

结合知识库里另外 3 篇相近文档，可以更清楚地定位 Agent-Dice：

- `Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions` 更关注如何评测 agent 的记忆能力；Agent-Dice 关注的是如何在参数更新层面保留旧知识、吸收新知识。
- `MemoryBench` 讨论的是 LLM 系统层面的持续学习与反馈学习评测；Agent-Dice 则是一种可以直接作用在 agent 参数更新上的具体机制。
- `MobileUse` 代表了需要跨 app、长流程执行的 GUI agent 场景；Agent-Dice 的价值之一，就是为这类 agent 提供更稳的多任务持续适应路径，而不是每进一个新 app 域就重新顺序微调。

如果把这些工作放在一起看，Agent-Dice 更偏“持续学习基础设施”，而不是单独的记忆模块或评测基准。

## 可复用启发

- 对 agent continual learning 来说，关键不只是增加新数据，而是显式识别哪些知识应共享、哪些知识应屏蔽。
- 直接顺序微调容易把“领域差异”误当成“通用知识”，因此参数融合前的冲突过滤很重要。
- 如果任务之间确实存在共享结构，轻量级 task vector 融合可能比反复重训练更经济。
- 持续学习方法不应只在传统 NLP 任务上验证，agent 场景里的跨环境、跨工具干扰更能暴露真实问题。

## 局限与边界

- 本笔记主要依据 arXiv 摘要页与 HTML 正文整理，未逐表核对附录中的全部数值。
- Agent-Dice 解决的是参数更新冲突问题，但并不直接提供外部记忆、在线检索或经验库管理机制。
- 该方法是否对更大规模、多模态、更强异构任务组合保持同样收益，仍需更多实证支持。

## 结论

Agent-Dice 的关键价值，在于把 agent 持续学习中的稳定性-可塑性困境重新表述为“共通知识与冲突知识的分离问题”。它通过几何共识过滤先去掉互相打架的更新，再通过曲率加权放大共享且重要的参数方向，从而以较低代价提升多任务持续学习表现。对于需要不断吸收新 app、新工具、新任务的 agent 系统，这是一条比单纯顺序微调更有针对性的路线。

> 来源：[[Agent-Dice_ Disentangling Knowledge Updates via Geometric Consensus for Agent Continual Learning]]

