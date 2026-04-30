# PDF skill

## 适用范围

用于阅读、解析和知识化 PDF，尤其是论文、报告、白皮书、技术手册、数据集说明和 PDF-only source。

触发信号：

- 用户要求“阅读 PDF”“解析 PDF”“完整解析 PDF”“总结论文 PDF”或“从 PDF 建立 wiki”。
- source、URL 或本地路径中出现 `.pdf`。
- arXiv/论文 source 同时提供摘要页和 PDF 链接。

如果同时触发 `arXiv_skill.md`，先按 arXiv skill 确认来源、版本和事实边界，再用本 skill 补读 PDF 正文。

## 核心原则

- PDF 是证据输入，不是长期知识资产。下载到本地只是临时步骤；处理完成后删除本地 PDF 和临时全文抽取文件，除非用户明确要求保留。
- `summary/` 和 `wiki/` 写给人读，不写“PDF 解析范围”“页码范围”“抽取工具如何运行”这类过程日志。
- 正文可以保留必要页码引用，例如 `Table 2, p.5`、`Figure 1, p.2`，用于证据定位。
- 不要只读摘要、引言和结论后声称完成全文解析。

## 推荐流程

1. 定位和获取 PDF。
   - 用户给本地路径时直接读。
   - source 中有远程 PDF 时，临时下载到 `sources/media/pdf/` 或系统临时目录。
   - 下载失败或被验证码阻断时，改用 HTML、官方页面或已有 source，并在笔记中标注证据边界。
2. 抽取结构和文本。
   - 先探测工具：`Get-Command pdfinfo,pdftotext,pdftocairo -ErrorAction SilentlyContinue`。
   - 用 `pdfinfo <file>` 确认页数、加密状态和 metadata。
   - 用 `pdftotext -layout <file> <temp.txt>` 抽取文本，统计每页字符量，识别空页、扫描页和低质量页。
3. 建立内部阅读地图。
   - 在工作过程中记录章节、图表、表格、附录和参考文献位置。
   - 这个地图用于阅读和核查，不要原样写入最终中文笔记。
4. 全文阅读和抽取。
   - 覆盖摘要、方法、实验、结果、局限、附录中与结论相关的部分。
   - 对关键事实保留页码级定位。
   - 参考文献只证明“论文引用了某工作”，不能自动证明被引工作的结论。
5. 图表核查。
   - 对关键页用 `pdftocairo -png -f <page> -l <page> -r 160 <file> <out-prefix>` 渲染。
   - 只保留真正需要复查或嵌入说明的图片。
   - 图表 caption 不能替代图表本体；未看图时标注“仅基于标题/说明文字”。
6. 写入知识库。
   - 更新或创建 `summary/` 来源笔记。
   - 更新或创建相关 `wiki/` source-note、概念页、对比页或综述页。
   - 先复用已有概念页，避免因为一个 PDF 新增重复概念页。
7. 同步维护文件。
   - 更新 `knowledge_index/index.md`、`sources.md`、`tags.md`、`backlinks.md`、`related.md`、`concepts.md`、`assets.md`、`questions.md`。
   - 向 `knowledge_index/log.md` 追加记录：处理了哪个 source、更新哪些页面、保留哪些截图、删除了哪些临时 PDF/文本文件、还有哪些待确认问题。
   - source frontmatter 为 `status: "new"` 且已完成 ingest 时，改为 `status: "processed"`。
8. 清理临时文件。
   - 删除临时 PDF，例如 `Remove-Item -LiteralPath "<pdf>"`。
   - 删除临时全文抽取 `.txt`，除非它被用户明确要求保留。
   - 确认 frontmatter、assets index 和日志中没有把已删除 PDF 当作可用本地资产引用。

## 输出要求

来源笔记和 wiki 页面应写知识，不写解析过程。推荐结构：

```markdown
## 核心结论

## 背景与问题

## 方法、机制或主张

## 实验、证据与结果

## 图表、公式与表格

## 局限与信息边界

## 与 wiki 中已有内容的关系

## 可复用启发

## 待确认问题
```

每个已完整处理的 PDF 至少沉淀：

- 1 个最核心结论。
- 3 个重要待确认问题。
- 关键图表或表格的知识化说明，必要时带页码。
- 与已有 wiki 页面的关系。

## 实战问题记录

来自 `Self-Consistency Improves Chain of Thought Reasoning in Language Models` 试运行：

- 不能把“pdfinfo 显示 24 页、pdftotext 如何抽取、p.1-p.24 页码范围”写进最终笔记正文；这些属于工作日志。
- 证据页码仍然有价值，应写成结论旁的定位，例如 `Table 2, p.5`。
- 发现已有 `LLM Reasoning Decoding` 概念页时，应合并更新它，而不是新增 `Self-Consistency Decoding` 重复概念页。
- 本地 PDF 下载后容易被误登记为资产；正确做法是处理完删除 PDF，只登记保留下来的关键截图。

## 质量判断

合格结果应满足：

- 已核对页数、文本层质量和关键图表页。
- 来源笔记没有出现冗余的“PDF 解析范围/页码范围”过程段落。
- 关键事实有来源或页码定位，且不把 OCR/抽取错误写成事实。
- wiki、索引、反向链接、资产记录和日志同步。
- 本地 PDF 和临时全文抽取文件已删除，页面中没有失效本地 PDF 引用。
