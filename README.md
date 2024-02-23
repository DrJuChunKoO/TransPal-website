[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDrJuChunKoO%2FTransPal-website)

# TransPal

會議逐字稿紀錄網站
Meeting Transcript Recording Website


## 架構 | Structure

TransPal 由三個部分組成
Meeting Transcript Recording Website


- 轉錄工具：（開發中，目前可透過 https://www.vocol.ai/ 轉錄的 .srt 字幕檔匯入編輯器）
- 編輯器：https://github.com/DrJuChunKoO/TransPal-editor
- 網站：https://github.com/DrJuChunKoO/TransPal-website

- Transcription tool: (Under development, currently, .srt subtitle files transcribed via https://www.vocol.ai/ can be imported into the editor)
- Editor: https://github.com/DrJuChunKoO/TransPal-editor
- Website: https://github.com/DrJuChunKoO/TransPal-website

## 開發 | Development

- use Node.js v20

```
npm i
npm run dev
```

## 新增會議紀錄 | Adding Meeting Records


1. 使用 [編輯器](https://transpal-editor.juchunko.com/) 編輯後儲存
2. 將會議紀錄檔案放置於 `public/speeches/` 目錄下
   
1. Edit using the [editor](https://transpal-editor.juchunko.com/) and save
2. Place the meeting record file in the `public/speeches/` directory

## 新增大頭貼

1. 將大頭貼裁減為正方形
2. 在 [Squoosh](https://squoosh.app/) 上將圖片轉檔為 webp 格式
3. 將圖片檔案名稱設為 `{講者名稱}.webp`
4. 放置於 `public/avatars/` 目錄下

1. Crop the profile picture into a square
2. Convert the image to webp format on [Squoosh](https://squoosh.app/)
3. Set the image file name as `{speaker name}.webp`
4. Place it in the `public/avatars/` directory
