[繁體中文](README.zh-TW.md) |
[English](README.md)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDrJuChunKoO%2FTransPal-website)

# TransPal

Meeting Transcript Recording Website

## Structure

TransPal consists of three parts

- Transcription tool: https://github.com/DrJuChunKoO/TransPal-transcriber
- Editor: https://github.com/DrJuChunKoO/TransPal-editor
- Website: https://github.com/DrJuChunKoO/TransPal-website

## Development

- use Node.js v20

```
pnpm i
pnpm run dev
```

## Adding Meeting Records

1. Edit using the [editor](https://transpal-editor.juchunko.com/) and save
2. Place the meeting record file in the `public/speeches/` directory

## Add Profile Picture

1. Crop the profile picture into a square
2. Convert the image to jpg format on [Squoosh](https://squoosh.app/)
3. Set the image file name as `{speaker name}.jpg`
4. Place it in the `public/avatars/` directory
