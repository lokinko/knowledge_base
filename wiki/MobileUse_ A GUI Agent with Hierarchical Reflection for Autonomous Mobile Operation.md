---
title: "MobileUse: A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation"
summary: 通过 action、trajectory、global 三层反思和主动探索机制，提升移动长程任务中的鲁棒执行能力
date: 2025-07-16
category: publication
badge: NeurIPS'26
authors:
  - Ning Li
  - Xiangmou Qu
  - Jiamu Zhou
  - et al.
tags:
  - Mobile-Agent
  - GUI-Agent
  - Reflection
  - Exploration
links:
  论文: https://arxiv.org/abs/2507.16853
  代码: https://github.com/MadeAgents/mobile-use
---

## 研究问题

移动 GUI agent 在真实手机任务里面临三类核心困难：

- 任务链条长，长程执行容易一路积累偏差。
- 单步动作错了以后，错误恢复很难。
- 一旦遇到陌生 app 或陌生页面，agent 会出现明显的 cold-start 问题。

已有方法虽然会加反思模块，但很多反思只停留在单步动作层，既不一定真能纠错，还会带来额外延迟，甚至因为 hallucinated feedback 把操作带偏。本文要解决的，正是移动长程任务中的“如何稳”和“如何在陌生环境里尽快熟”。

## 整体思路

MobileUse 将系统设计成一个多智能体框架，核心组件包括：

- `Operator`：负责实际执行动作
- `Progressor`：负责总结当前进度
- `Hierarchical Reflectors`：负责多层次反思
- `Proactive Explorer`：负责提前探索陌生环境并积累共通知识

论文把整个系统分成两个阶段：

- `Proactive Exploration`：执行前先探索 app，补充环境知识
- `Autonomous Mobile Operation`：正式执行任务，并在过程中按需触发多层反思

这意味着 MobileUse 的关键不是“让一个 agent 更聪明”，而是同时解决执行、总结、反思与知识积累四件事。

## 方法结构

### 1. Hierarchical Reflection：三层反思机制

作者认为，长程移动任务的失败并不都发生在同一个时间尺度上，因此反思也不能只有一种粒度。MobileUse 把反思拆成三层。

### 1.1 Action Reflector

`Action Reflector` 负责检查当前单步动作是否可靠，主要解决：

- grounding 错误
- 局部视觉误判
- 当前界面理解错误

但作者也明确指出，绝大多数步骤本来就是对的。如果每步都调用反思器，既慢，又可能因为错误反思而制造新错误。

因此，MobileUse 加入了 `Reflection-on-Demand`：只有当动作 token 的平均对数概率低于阈值时，才触发 action-level 反思。

这个设计的价值在于，反思不再是默认全开，而是由置信度门控。

### 1.2 Trajectory Reflector

有些错误并不是单步错，而是“每一步都看起来合理，但整体已经偏航”。为此，MobileUse 引入 `Trajectory Reflector`，它看的是最近若干步动作、短历史和已有 action-level 反馈，用来判断轨迹是否仍在朝任务目标推进。

它主要处理以下模式：

- 重复动作
- 重复截图
- 累积性的 action-level error

也就是说，这一层负责发现“局部没错但整体开始绕圈”的问题。

### 1.3 Global Reflector

`Global Reflector` 在任务将要结束时介入。因为在长程任务中，agent 很可能过早宣布完成，或漏掉某些关键子目标。

Global Reflector 会综合历史动作和最新截图，判断：

- 任务是否真的完成
- 是否只是提前 terminate
- 是否需要返回继续执行

这一层的作用，是把“是否结束”从 operator 的主观判断里抽出来，做一次全局校验。

## 2. Proactive Exploration：先熟悉环境，再执行任务

除了反思，MobileUse 的第二个核心设计是 `Proactive Exploration`。作者观察到，许多失败并不是因为 agent 不会推理，而是因为它对陌生 app 根本没有基本操作知识。

因此，在正式任务前，系统会主动探索目标环境，积累一些通用知识，例如：

- app 页面结构
- 常见功能分布
- 某些任务领域里的优先级规则

作者把它理解为一种“先做环境熟悉，再做任务执行”的机制，用来缓解 cold-start。

## 主要结果

### 1. 在 AndroidWorld 和 AndroidLab 上达到 SOTA

根据论文结果，MobileUse 在两个动态 Android benchmark 上都达到当时 SOTA：

- `AndroidWorld`：`62.9%`
- `AndroidLab`：`44.2%`

在 AndroidWorld 上，它相较当时 SOTA 解法 `V-Droid` 进一步提高了 `3.4%`；相较强基线 `Agent-S2` 提升 `8.6%`；相较单体 `Qwen2.5-VL-72B-Instruct`，成功率提升 `27.9%`。

这表明 MobileUse 的增益不只是“换个底模”，而是来自系统结构本身。

### 2. 层级反思本身就能带来明显增益

在消融实验里，作者指出：

- 三层 reflectors 都有效；
- 尤其对 medium 和 hard 任务更重要；
- 加入完整层级反思后，整体 `SR` 提升约 `12.1%`。

这说明长程任务的鲁棒性问题，确实不能只靠单步动作纠错来解决。

### 3. Reflection-on-Demand 比“每步都反思”更合理

论文发现，当基于动作置信度只在必要时触发 Action Reflector 后：

- 可以减少大量无效甚至错误的反思；
- 在省掉大部分反思调用的情况下，成功率下降很小；
- 说明真正关键的只是少数高风险步骤。

作者在进一步分析里提到，当阈值设置合适时，即使省去超过 `85%` 的反思，成功率下降也不到 `1.5%`。这强化了一个重要判断：反思的价值在于“关键时刻介入”，而不是“处处介入”。

### 4. 主动探索对陌生环境确实有帮助

在层级反思的基础上，再加入 `Proactive Exploration` 后，整体 `SR` 继续提升 `1.3%`，在 easy task 上提升 `4.9%`。

这个结果说明，很多所谓“执行错误”，其实在更早阶段就已埋下：agent 根本不知道陌生 app 的基本布局和任务习惯。主动探索提供的正是这种先验知识。

## 与相关文档的对照理解

结合知识库中另外 3 篇相近文档，可以更清楚地理解 MobileUse 的定位：

- `ColorBench` 是评测基准，专门暴露复杂长程移动任务中的规划、记忆与反思短板；MobileUse 则可以看作是正面回应这些短板的一种方法型工作。
- `KnowU-Bench` 强调真实个人助手中的偏好获取、主动打断和同意机制；MobileUse 更聚焦 GUI 操作执行层，不直接处理“什么时候该主动帮用户”。
- `HammerBench` 关注多轮 function-calling 的鲁棒性；MobileUse 关注的是 GUI 执行与状态恢复，因此更接近界面操作代理，而不是工具调用代理。

因此，MobileUse 的主要价值在“长程 GUI 执行鲁棒性”，而不是完整个人助理的上层决策能力。

## 可复用启发

- 长程 agent 系统中的反思最好按时间尺度分层设计，而不是只做单步校验。
- 反思应当由置信度或错误模式触发，而不是默认每步执行。
- 对陌生环境，先探索再执行通常比直接进入任务更稳。
- 将执行、进度总结、局部纠错和全局验收拆成不同角色，有助于缓解单智能体同时承担所有职责的负担。

## 局限与边界

- 本笔记依据 arXiv 摘要页和 HTML 正文整理，未逐项展开附录中的失败类型细分和 toolkit 工程细节。
- MobileUse 的效果建立在较强底模和多组件协作基础上，实际部署成本高于简单单体 agent。
- 它主要解决执行与恢复问题，并未覆盖个性化建模、授权机制、隐私约束等更上层个人助理能力。

## 结论

MobileUse 的关键价值，在于把移动 GUI agent 的“反思”从单步纠错扩展成一个分层、按需触发、能与主动探索配合的系统机制。它证明了在长程移动任务中，真正有效的不是更频繁的反思，而是更合适粒度、更低噪声、更有前置知识支持的反思与探索组合。

> 来源：[[MobileUse_ A GUI Agent with Hierarchical Reflection for Autonomous Mobile Operation]]
