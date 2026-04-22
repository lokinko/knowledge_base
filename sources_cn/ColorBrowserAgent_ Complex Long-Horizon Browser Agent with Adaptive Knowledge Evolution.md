---
title: "ColorBrowserAgent: Complex Long-Horizon Browser Agent with Adaptive Knowledge Evolution"
summary: 通过人类在环知识适配和知识对齐的渐进式摘要，提升异构网站和长程网页任务中的稳定性
date: 2026-01-07
category: publication
badge: ACL'26 Industry track (Oral)
authors:
  - Jihong Wang
  - Jiamu Zhou
  - Weiming Zhang
  - et al.
tags:
  - Browser-Agent
  - Web-Navigation
  - Knowledge
  - Long-Horizon
links:
  论文: https://arxiv.org/abs/2601.07262
---

## 研究问题

网页自动化 agent 在真实环境中主要受两类问题限制：

- `site heterogeneity`：不同网站的界面风格、操作惯例和局部规则差异很大，通用模型缺少站点先验。
- `long-horizon instability`：任务一长，错误会沿轨迹累积，逐渐出现 `decision drift`。

作者认为，这两类问题都不能只靠更大的通用 VLM 解决。真正缺的，是可持续沉淀的站点知识，以及不会在长历史里逐步漂移的状态表示。

## 核心思路

ColorBrowserAgent 的设计围绕两套互补机制展开：

- `human-in-the-loop knowledge adaptation`
- `knowledge-aligned progressive summarization`

前者解决“陌生网站怎么快速适应”，后者解决“长程交互怎么不走偏”。两者结合起来，形成一个 `knowledge-evolving agent`。

## 方法结构

### 1. Human-in-the-loop Knowledge Adaptation

作者把稀疏的人类反馈转成可复用的外部知识，而不是继续往模型参数里硬塞。论文明确强调，这是一种 `training-free adaptation`：

- 站点特定先验被外化到持久知识库中；
- 适应性不再依赖重新训练；
- 面对界面异构时，可以按需检索已有站点知识。

这个设计的核心价值，是把 domain-specific prior 从模型内部参数里解耦出来，变成可累计、可维护的外部资产。

### 2. Knowledge-aligned Progressive Summarization

第二套机制用来处理长程浏览中的漂移问题。作者指出，长轨迹中的原子级交互历史过长、过噪，直接喂给模型很容易稀释真正重要的状态。

为此，ColorBrowserAgent 不保留原始长历史，而是维护一个压缩后的 `belief state`：

- 逐步总结当前交互进展；
- 把历史压缩成更稳定的语义状态；
- 并与检索到的专家先验保持一致。

作者把这称为 `knowledge-aligned progressive summarization`。其目的不是简单摘要，而是让长程执行始终围绕任务目标和已知网站规则保持一致。

## 主要结果

### 1. WebArena 上达到 71.2%

在 WebArena 上，ColorBrowserAgent 达到 `71.2%` success rate，明显超过论文中提到的最强先前方法 `61.7%`。

作者特别指出，它在 Shopping、Admin、Multisite 等场景上的优势尤其明显。这说明站点知识和长程稳定性这两件事，恰好对应了真实网页任务里的核心瓶颈。

### 2. WebChoreArena 零样本迁移达到 47.4%

在更复杂、推理链更长、记忆负担更重的 `WebChoreArena` 上，ColorBrowserAgent 在 `zero-shot transfer` 条件下达到 `47.4%`。

正文还给出一个很关键的对照：

- 最强先前方法 `31.1%`
- knowledge-free 变体 `34.4%`
- ColorBrowserAgent `47.4%`

这意味着收益并不只是来自 backbone 推理增强，而是可复用的网站级知识本身确实在发挥作用。

### 3. 工业部署中用户满意度提升 19.3%

除了 benchmark，论文还给出线上部署结果：商业环境中用户满意度相对提升 `19.3%`。并且在积累了较多站点先验的垂直领域，任务成功率可超过 `95%`。

这使它和很多只在学术 benchmark 上有效的方法不同，说明其外部知识演化路线更接近可部署系统。

## 与相关文档的对照理解

结合知识库中另外 3 篇相近文档，可以更清楚地理解它的定位：

- `Plan-MCTS` 通过把搜索转到 Plan Space 来解决网页长程搜索效率问题；ColorBrowserAgent 则更强调站点先验积累和长历史稳定压缩，两者分别从“搜索策略”和“知识演化”切入。
- `ColorBench` 是移动 GUI 长程 benchmark；ColorBrowserAgent 可以看作网页场景里对应的“复杂长程真实执行”方法型工作。
- `LLM-based Multi-Agent Systems_ Techniques and Business Perspectives` 强调外部知识、协议和可持续生态；ColorBrowserAgent 则给出了一个很具体的落点：站点知识可以作为外部可演化资产，而不必只存在参数中。

## 可复用启发

- 对异构网页环境，外部化站点先验往往比持续重训更可控。
- 长程轨迹的关键不是保留更多原始历史，而是维持更稳定、更任务对齐的 belief state。
- 如果一个 agent 要进入生产环境，最好把“人类纠错”沉淀成长期复用知识，而不是一次性人工干预。
- 真正的长程稳定性通常来自“知识管理 + 状态压缩”共同作用，而不是只靠更强的单步决策。

## 局限与边界

- 本笔记依据 arXiv 摘要页与 HTML 正文整理，未展开附录中的全部模块实现细节。
- 该方法依赖持续积累高质量站点知识，早期冷启动阶段效果仍可能受限。
- 它主要解决网页异构性和长程漂移问题，不直接等同于通用型 planning/search 框架。

## 结论

ColorBrowserAgent 的关键贡献，在于把网页代理的适应性和稳定性同时转化为“知识如何外化、如何演化、如何与长程历史对齐”这三个问题。它证明了浏览器 agent 并不一定要靠频繁重训来适应新网站；通过人类在环知识沉淀和知识对齐的渐进式摘要，同样可以显著提升真实世界中的鲁棒性和可迁移性。

> 来源：[[ColorBrowserAgent_ Complex Long-Horizon Browser Agent with Adaptive Knowledge Evolution]]
