# 涨粉参谋（GrowthMate）— 演示视频与视觉资产（CMP-5）

Creative Minds Jam #1（香港）黑客松 ·「涨粉与互动」赛道 · 演示视频与关键视觉资产。

## 交付物

- `05_成片/GrowthMate_demo_v1.mp4` — 1080p 母版（1920×1080 · 30fps · 87.4s · H.264/AAC）
- `05_成片/GrowthMate_demo_720p_submit.mp4` — 提交版（1280×720 · 6.3MB）
- `01_分镜/README_分镜与视觉系统.md` — 分镜表、旁白全文、视觉规范
- `02_动画源文件/demo.html` — 可重渲染的 Canvas 动画源
- `03_关键视觉/` — 8 张关键视觉 PNG
- `04_音频/vo_full.wav` + `subtitles.srt` — 旁白与双语字幕

## 视频主线

接入 Minds → 连续（记住昨日互动）→ 自主（每日增长简报）→ 记忆（用创作者声线回复）→ 增长闭环 → CTA。

## 重渲染

1. 打开 `02_动画源文件/demo.html`（浏览器实时预览）。
2. 逐帧导出（Playwright Chromium）：调用 `window.captureFrame(i)` 输出 `image/jpeg` data URL，`i` 从 0 到 `window.NFRAMES-1`。
3. 合成：`ffmpeg -framerate 30 -i frames/frame_%04d.jpg -i vo_full.wav -c:v libx264 -pix_fmt yuv420p -c:a aac out.mp4`。
4. 修改对白后需同步更新 `demo.html` 中的 `voDurs`、`VO_TEXT` 与 `subtitles.srt`。

## 与产品脚本的关系

产品研究员的正式脚本已交付：仓库根目录 `涨粉参谋-产品定位与演示脚本.md`。本片旁白与分镜基于该脚本的主线（接入 → 记住昨天 → 自动简报 → 声线回复）先行定稿；如需完全逐字对齐脚本，替换 `demo.html` 中的对白后重渲染即可，不影响视觉/动效资产。
