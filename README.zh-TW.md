[繁體中文](README.zh-TW.md) |
[English](README.md)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDrJuChunKoO%2FTransPal-website)

# TransPal

會議逐字稿紀錄網站

## 架構

TransPal 由三個部分組成

- 轉錄工具：（開發中，目前可透過 https://www.vocol.ai/ 轉錄的 .srt 字幕檔匯入編輯器）
- 編輯器：https://github.com/DrJuChunKoO/TransPal-editor
- 網站：https://github.com/DrJuChunKoO/TransPal-website

## 開發

- use Node.js v20

```
npm i
npm run dev
```

## 新增會議紀錄

1. 使用 [編輯器](https://transpal-editor.juchunko.com/) 編輯後儲存
2. 將會議紀錄檔案放置於 `public/speeches/` 目錄下

## 新增大頭貼

1. 將大頭貼裁減為正方形
2. 在 [Squoosh](https://squoosh.app/) 上將圖片轉檔為 webp 格式
3. 將圖片檔案名稱設為 `{講者名稱}.webp`
4. 放置於 `public/avatars/` 目錄下
