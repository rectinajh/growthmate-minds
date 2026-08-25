# 快速配置：填入 Minds API key

`.env` 是一个**隐藏文件**（以 `.` 开头），所以文件列表里默认看不到它。它已经存在：

```
CMP-4_Minds代理构建/.env
```

## 打开方式

- **Paperclip/编辑器**：直接在文件路径输入框打开 `CMP-4_Minds代理构建/.env`；若侧边栏不显示隐藏文件，用终端 `cat CMP-4_Minds代理构建/.env` 打开。
- **macOS Finder**：进入 `CMP-4_Minds代理构建`，按 `Cmd + Shift + .` 显示隐藏文件，然后双击 `.env`。
- **终端**：
  ```bash
  cd CMP-4_Minds代理构建
  nano .env
  ```

## 只需填一行

```
MINDS_BUILDER_API_KEY=你的key
```

key 获取：`hellominds.ai → Builder console → Keys → Create`（仅显示一次）。

保存后回复「已填好」，工程师继续 `doctor → list → onboard → build → demo`。
