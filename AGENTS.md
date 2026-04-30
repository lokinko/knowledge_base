# AGENTS.md

## 0. 核心思想

本仓库的目的是构建一个由 LLM 维护的个人知识 wiki。

传统 RAG 在查询时从原始资料里临时检索片段，每次都重新拼接知识；本仓库采用相反模式：LLM 将 `sources/` 中的原始资料增量编译为 `summary/` 中的持久内容，并在 `wiki` 持续维护索引、链接、概念页、主题页、矛盾记录和研究输出。知识不是每次查询时重新发现，而是持续累积、被修订、被交叉链接。

基本分工：

- 用户负责收集资料、提出问题、决定研究方向。
- LLM 负责阅读、抽取、重写、归档、链接、索引、健康检查和持续维护。
- Obsidian 是浏览和编辑前端；LLM 是 wiki 维护者；markdown 文件是长期知识资产。

目标不是把英文网页翻译成中文，而是维护一个可持续增长的个人研究 wiki。

## 1. 仓库架构

### `sources/`：原始资料层

`sources/` 存放原始资料，通常来自 Obsidian Web Clipper、论文页面、网页文章、仓库 README、数据集说明、图片材料或手动整理的摘录。

原则：

- `sources/` 是事实来源和可追溯证据层。
- 默认读取，不重写正文，不清洗原文，不删除内容。
- 如果已有 frontmatter `status: "new"`，可将其视为待处理信号。
- 处理状态优先记录到 `knowledge_index/log.md` 和 `knowledge_index/sources.md`；是否回写 `status: processed` 取决于用户当次任务或已有技能要求。
- 原文损坏、来源缺失或材料不足时，不能自行补事实，只能在 wiki 中标注信息边界。

`sources/media` 存放图片、视频、图表、下载的附件和生成的可视化资产。

约定：

- 图片优先放入 `sources/media/`。
- 图表、matplotlib 输出或其他生成物可按任务创建子目录。
- 资产命名应稳定、可读、可追溯，优先包含来源短名或主题短名。
- `wiki/` 页面引用本地资产，`knowledge_index/assets.md` 记录资产来源和用途。
- 不把视频和大型二进制文件放进 `wiki/` 或 `knowledge_index/`, 而是放它们的链接以及功能介绍。

### `summary/`：翻译与处理后的资料

`summary/` 存放翻译与处理后的资料，便于快速预览原始内容的大致含义，用户通常阅读它，并且会写入部分个人观点及不完善的想法。

可以包含：

- 来源笔记：对单个 source 的去噪、重写和结构化沉淀。
- 概念页：围绕概念、方法、模型、任务、数据集、评测、人物、机构等形成的持续更新页面。
- 主题综述：跨多个来源的综合整理。
- 对比页：方法、论文、系统、数据集、产品或观点的横向比较。
- 查询产物：用户提出复杂问题后形成的可复用回答。
- Marp 幻灯片、图表说明、研究路线图等衍生输出。

### `wiki/`：LLM 编译后的 wiki

`wiki/` 是知识库主体，由 LLM 写入和维护。一个 source 可能创建或更新多个 wiki 页面；一个 wiki 页面也可能综合多个 sources。
`wiki/` 是一些知识的原子概念，需要包含原始含义、相关引申、当前相关内容的一些看法等，适合做内容的聚合。
`wiki/` 是自行演化的原子知识，可以被合并、替代、更新和删除，每当有新知识被纳入后，会影响到对应的 wiki 概念。

### `knowledge_index/`：索引、日志和导航层

`knowledge_index/` 是 LLM 操作 wiki 的导航系统，必须随 wiki 一起维护。

两个核心文件：

- `knowledge_index/index.md`：内容索引。按类别列出 wiki 页面、1 句话摘要、主要标签、来源数量、更新时间和相关链接。回答问题前优先读它。
- `knowledge_index/log.md`：时间日志。追加记录 ingest、query、lint、重组、重要修订等操作。日志应可 grep，建议条目标题使用 `## [YYYY-MM-DD] type | title`。

可选但推荐维护的索引：

- `knowledge_index/sources.md`：原始资料到 wiki 页面之间的映射。
- `knowledge_index/tags.md`：标签词表、同义标签、标签到页面的映射。
- `knowledge_index/backlinks.md`：重要反向链接和入链关系。
- `knowledge_index/related.md`：相似、互补、冲突、可对比的内容关系。
- `knowledge_index/concepts.md`：已有概念页和待创建概念页候选。
- `knowledge_index/assets.md`：`public/` 资产与 wiki 页面之间的映射。
- `knowledge_index/questions.md`：值得继续追问、补材料或做综述的问题。

索引不是形式文件。它们是 LLM 在中等规模 wiki 中替代复杂 RAG 的工作记忆。

### `skills/`：专用处理流程

`skills/` 存放特定来源、特定任务或特定格式的处理技能。

执行任务时应主动检查并读取相关技能，而不是每次重新设计流程。当前已知：

- `skills/arXiv_skill.md`：处理 arXiv 摘要页、论文页、HTML/PDF 链接和论文剪藏。
- `skills/pdf_skill.md`：完整阅读和解析 PDF 全文，提取章节、页码、图表、表格、公式、证据边界，并整合进 wiki。

如果来源、任务或内容特征匹配技能，技能优先；但本文件的 wiki 维护理念、索引要求和事实边界仍然生效。

### `principles/`：长期行为原则

`principles/` 存放长期贯彻的执行原则。执行维护任务时应读取相关原则，并把它们作为默认工作方式。

当前已知：

- `principles/andrej-karpathy-skill.md`：强调明确假设、保持简单、精确修改、围绕可验证目标执行。

原则约束执行方式，不替代目录结构和 wiki 维护协议。

## 2. 核心操作

### 2.1 Ingest：摄入新资料

当用户要求处理 `sources/` 中的新资料时，目标不是写一篇孤立摘要，而是把新资料整合进现有 wiki。

执行步骤：

1. 定位目标 source。若用户未指定，优先处理 `sources/` 下 `.md` 且 frontmatter `status: "new"` 的文件。
2. 读取相关 `principles/` 和匹配的 `skills/`。
3. 阅读 source，识别来源、作者、日期、链接、正文结构、图片、附件、噪声和信息层级。
4. 如 source 提供可访问的网页、PDF、HTML、仓库或数据集链接，补读必要上下文；无法访问时记录限制。
5. 先读 `knowledge_index/index.md`，再检索 `wiki/` 和其他索引，找出相关页面、相似资料、冲突资料和可更新概念页。
6. 将 source 文件中的 frontmatter `status: "new"` 改为 `status: "processed"`
7. 产出或更新 `summary` 和 `wiki/` 页面：
   - 可为该 source 创建来源笔记。
   - 可更新已有概念页、主题页、对比页或综述页。
   - 若新 source 改变了旧结论，必须在相关页面标注修订依据。
   - 严格区分代码和公式，公式请使用 $\text{laTex}$ 的格式，短 code 使用 `code` 风格。
1. 添加内部链接、反向链接、tags、来源链接和资产引用，每个内容至少总结出 1 个最核心的结论，并提 3 个重要的问题。
2. 更新 `knowledge_index/index.md`、`sources.md`、`tags.md`、`backlinks.md`、`related.md`、`concepts.md`、`assets.md` 中相关内容。
3. 向 `knowledge_index/log.md` 追加 ingest 记录，说明处理了什么、更新了哪些页面、留下哪些待确认问题。

单个 source 可以触达 10-15 个 wiki 文件。不要把 ingest 简化成“在 `wiki/` 里生成同名摘要”。

### 2.2 Query：基于 wiki 回答问题

当用户向知识库提问时，默认先问 wiki，再视需要回到 sources 或外部来源。

执行步骤：

1. 读取 `knowledge_index/index.md`，必要时读取 `tags.md`、`related.md`、`concepts.md` 和 `questions.md`。
2. 打开相关 `wiki/` 页面，追踪内部链接和反向链接。
3. 若答案依赖原始证据，再读取对应 `sources/`。
4. 合成回答，明确区分：
   - wiki 已沉淀的结论
   - 单个 source 支持的信息
   - 多个 source 之间的分歧
   - 当前无法确认的缺口
5. 如果回答具有长期价值，应写回 `wiki/`，形成新页面或更新旧页面，而不是只留在聊天中。
6. 如果生成 Markdown、Marp、图表或图片，把文件放在合适目录，并更新索引与日志。

好的 query 产物也应累积进 wiki。用户的探索和问题本身是知识库增长的一部分。

### 2.3 Lint：健康检查和持续清理

定期或按用户要求对 wiki 做健康检查。

检查重点：

- 矛盾：新旧页面是否有相互冲突的结论。
- 过时：旧结论是否被新 source 更新或推翻。
- 孤岛：是否存在无入链、无出链、未进入索引的页面。
- 缺页：重要概念、实体、数据集、方法或问题是否频繁出现但没有独立页面。
- 标签：同义标签、大小写、中文/英文混用是否导致检索分裂。
- 来源：结论是否缺少来源，是否把摘要级信息写成全文级结论。
- 资产：图片和附件是否已本地化，引用路径是否可用。
- 问题：是否存在值得继续追问、搜索或补充来源的研究缺口。

Lint 结果可以直接修复小问题；涉及大规模重组、批量改名、目录迁移或大量页面合并时，先说明方案和影响范围。

## 3. 页面写作规范

### 3.1 语言和风格

- 默认使用中文写作。
- title 保留原文标题；英文术语、论文名、模型名、产品名、数据集名和专有名词保留英文。
- 不逐句翻译，不保留网页口语、宣传语、导航信息和重复段落。
- 写作目标是长期复用，不是即时聊天回答。
- 不使用比喻或故事化例子替代概念解释。
- 不补写无法从 source、metadata、可访问链接或已有 wiki 确认的事实。

### 3.2 信息边界

必须明确区分：

- 原文明确给出的事实。
- LLM 对多个页面的综合判断。
- 尚未被充分证实的假设。
- 当前材料无法确认的缺口。

特别注意：

- arXiv 摘要页只支持摘要级结论。
- 论文 PDF/HTML 支持更细的技术和实验细节，但仍需避免过度推断作者意图。
- 仓库 README 只能代表仓库文档，不自动等同于论文结论或实际效果。
- 数据集页面只支持数据集说明，不自动推出模型表现。
- 二手文章或社交平台内容应标注为转述或观点，不写成一手事实。

### 3.3 推荐 frontmatter

按页面类型裁剪，但尽量保留可检索性。

```markdown
---
title: "Original Title"
summary: 一句话说明该页面沉淀的核心知识
type: source-note
category: publication
status: active
created: 2026-04-22
updated: 2026-04-22
source_count: 1
confidence: medium
tags:
  - Mobile Agent
  - GUI Agent
  - Reflection
  - Benchmark
sources:
  - "[[../sources/Original Source.md]]"
links:
  paper: https://arxiv.org/abs/xxxx.xxxxx
related:
  - "[[Related Concept.md]]"
assets:
  - "../public/pictures/example.png"
---
```

常见 `type`：

- `source-note`
- `concept`
- `entity`
- `topic`
- `comparison`
- `synthesis`
- `query-output`
- `slide-deck`
- `dataset`
- `tool`

### 3.4 推荐正文结构

来源笔记可使用：

```markdown
## 核心结论

## 背景与问题

## 方法、机制或主张

## 证据与限制

## 与 wiki 中已有内容的关系

## 可复用启发

## 待确认问题

> 来源：[[Original Source.md]]
```

概念页可使用：

```markdown
## 定义

## 为什么重要

## 相关方法或分支

## 证据与例子

## 与其他概念的关系

## 争议、边界与未解问题

## 相关页面
```

对比页可使用：

```markdown
## 对比结论

## 对比维度

## 表格

## 分歧与适用条件

## 后续需要补充的资料
```

## 4. 链接、标签和反向链接

每次写入或更新 `wiki/` 时，都要考虑它在 wiki 图谱中的位置。

必须尽量维护：

- 指向来源的链接。
- 指向相关概念页、主题页、对比页的内部链接。
- 反向链接记录。
- 充分细粒度的 tags。
- 与相似、互补、冲突资料之间的关系。

标签应覆盖多个维度：

- 研究领域
- 任务类型
- 方法机制
- 模型、系统或工具
- 数据集、benchmark 或评测环境
- 指标或评价维度
- 平台、场景或应用
- 资料类型
- 局限、风险或失败模式

不要为了增加图谱密度而制造无依据链接。弱关系可以标注为“可能相关”或“待确认关联”。

## 5. `index.md` 与 `log.md` 协议

### `knowledge_index/index.md`

`index.md` 是内容索引，回答问题和摄入资料前优先读取。

每条记录建议包含：

```markdown
- [[../wiki/Page.md]] — 一句话摘要。type: concept; tags: tag1, tag2; sources: 3; updated: 2026-04-22
```

应按实际 wiki 结构分组，例如：

- Sources
- Concepts
- Methods
- Benchmarks
- Tools
- Comparisons
- Syntheses
- Query Outputs
- Open Questions

### `knowledge_index/log.md`

`log.md` 是追加式时间日志，不要重写历史记录。

建议格式：

```markdown
## [2026-04-22] ingest | MobileUse

- Sources: [[../sources/MobileUse.md]]
- Updated: [[../wiki/MobileUse.md]], [[../wiki/GUI Agent.md]]
- Index changes: tags, backlinks, related
- Notes: 摘要页信息，实验细节待 PDF 核实
```

常见 type：

- `ingest`
- `query`
- `lint`
- `refactor`
- `asset`
- `schema`

日志应帮助 LLM 快速理解最近做了什么，而不是成为冗长日报。

## 6. 图片与附件处理

图片和附件是知识的一部分，不是装饰。

处理规则：

- 阅读 markdown 时，先读文本，再按需要查看其中引用的图片。
- 对论文图、系统架构图、数据集示例、流程图、表格截图等，应尽量本地化到 `sources/media`。
- 在 wiki 页面中解释图片承载的知识，而不是只插入图片。
- 资产路径写入页面 frontmatter 的 `assets` 字段，并登记到 `knowledge_index/assets.md`。
- 无法下载或查看的图片，标注“当前无法确认图片内容”。

## 7. 可选工具和自动化

随着 wiki 增长，可以让 LLM 使用或创建小工具辅助维护，例如：

- 本地 markdown 搜索 CLI。
- tags 和 backlinks 检查脚本。
- 未入索引页面扫描脚本。
- frontmatter 统计脚本。
- Marp 幻灯片生成流程。
- matplotlib 或其他图表生成脚本。

工具应服务于 wiki 维护，不要为了工具而工具。小规模时优先依赖 `knowledge_index/index.md` 和 `rg` 搜索。

## 8. 技能触发规则

执行任何任务时先检查 `skills/`。

明确触发 `skills/arXiv_skill.md` 的情况：

- source、url、正文链接中出现 `arxiv.org`。
- 文件是 arXiv 摘要页、论文页、HTML 页或 PDF 页剪藏。
- 正文中出现 arXiv 编号、`abs`、`pdf`、`html` 等明显信号。

明确触发 `skills/pdf_skill.md` 的情况：

- 用户要求“阅读 PDF”“解析 PDF”“完整解析 PDF”“总结论文 PDF”或从 PDF 建立 wiki。
- source、url、正文链接或本地文件路径中出现 `.pdf`。
- `sources/`、`sources/media/` 或其子目录中存在待处理 PDF 文件。
- 需要基于论文 PDF、报告 PDF、手册 PDF 或扫描 PDF 提取全文级结论、图表、表格、公式或页码级证据。

技能要求和本文件冲突时：

- 具体来源处理流程按技能执行。
- wiki 架构、索引、日志、链接和事实边界仍按本文件执行。
- 若技能要求将 source 状态改为 `processed`，可执行；否则优先保持 source 正文不可变，并在 log 中记录处理状态。

## 9. 默认工作方式

- 默认直接执行，不停留在泛泛分析。
- 先读索引，再读相关页面，再写入。
- 任何重要输出都优先沉淀为文件，而不是只留在聊天里。
- 每次写 wiki 都同步更新索引和日志。
- 每次新增知识都考虑是否需要更新概念页、主题页、对比页或 open questions。
- 只做和任务相关的修改；不顺手重构无关页面。
- 事实不够时写边界，不编造。
- 发现矛盾时记录矛盾，不强行调和。
- 发现高价值问题时写入 `knowledge_index/questions.md`。

## 10. 完成标准

一次合格的 wiki 维护任务应满足：

- 新资料不只是被摘要，而是被整合进已有 wiki。
- `wiki/` 中的页面结构清晰、可长期复用。
- 相关概念、主题、对比或综述页已按需更新。
- tags、内部链接、反向链接和来源链接足够充分。
- `knowledge_index/index.md` 已反映新增或修改内容。
- `knowledge_index/log.md` 已记录本次操作。
- 相关资产已放入 `sources/media` 并登记。
- 结论和证据边界清楚，没有把不确定信息写成事实。
- 用户之后可以在 Obsidian 中浏览、检索、追问并继续扩展这些内容。
