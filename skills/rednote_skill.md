# rednote skill

## 适用范围

用于把小红书 / Rednote 分享链接批量保存为本地 Markdown source，并把图片本地化到 `sources/media/`。

触发信号：

- 用户提供 `xhslink.com`、`xiaohongshu.com/explore/` 或 `xiaohongshu.com/discovery/item/` 链接。
- `sources/rednote/` 下存在待处理的小红书链接清单。
- 用户要求“导入小红书笔记”“保存小红书图片”“批量处理 Rednote 链接”。

不适用于：

- 已经进入 `wiki/` 的概念化整理；那属于普通 wiki ingest。
- 需要登录、私密、不可访问或被平台风控拦截的内容；这种情况只能记录限制，不能补事实。

## 工具

本仓库提供最小本地接口：

```powershell
node tools/rednote_importer.mjs --input sources/rednote_links.txt
```

常用形式：

```powershell
node tools/rednote_importer.mjs "https://www.xiaohongshu.com/explore/..."
node tools/rednote_importer.mjs --input sources/rednote_links.txt --category xhs
node tools/rednote_importer.mjs --input sources/rednote_links.txt --no-download-media
$env:REDNOTE_COOKIE="a1=..."
node tools/rednote_importer.mjs --input sources/rednote_links.txt
```

默认输出：

- Markdown：`sources/rednote/`
- 图片：`sources/media/`
- frontmatter：`status: "new"`，便于后续 wiki ingest。

该工具参考了 `bnchiang96/xiaohongshu-importer` 中的核心逻辑：抽取分享链接、规范化 `explore` URL、解析 `window.__INITIAL_STATE__`、提取标题/正文/图片/标签，并把 Obsidian 插件依赖替换为本地 Node.js 文件写入。

## 最小流程

1. 先确认输入是单个链接、分享文本，还是批量链接文件。
2. 运行 `tools/rednote_importer.mjs`，优先下载图片到 `sources/media/`。
3. 如果页面被拦截或解析为空，要求用户提供浏览器 Cookie，并通过 `REDNOTE_COOKIE` 或 `--cookie` 传入。
4. 检查生成的 `sources/rednote/*.md` 是否有标题、正文、图片引用和来源 URL。
5. 如用户要求继续知识化，再按本仓库 ingest 协议读取这些 `status: "new"` source，写入 `sources_cn/`、`wiki/` 并更新索引。

## 信息边界

- 小红书页面解析结果只代表页面 HTML / 初始状态中可见的信息。
- 图片下载失败时不要伪造本地资产；保留远程 URL 或记录失败。
- 视频笔记只记录视频链接和可解析图片；默认不下载视频。
- 平台可能改变页面结构，解析失败时先检查 HTML 是否仍包含 `window.__INITIAL_STATE__`。

## 质量判断

合格的导入结果应满足：

- 每条可访问链接生成一个 `sources/rednote/*.md` 文件。
- Markdown 保留原始来源 URL、导入时间、标题、正文、标签和图片引用。
- 下载的图片位于 `sources/media/`，路径在 Markdown 中可被 Obsidian 正常打开。
- 批量任务失败时逐条报错，不影响其他链接继续处理。
