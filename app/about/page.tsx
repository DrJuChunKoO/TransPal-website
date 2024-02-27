export default function Page() {
  return (
    <div className="container my-10">
      <div className="prose dark:prose-invert">
        <h1>關於</h1>
        <p>
          TransPal
          是一個會議記錄網站，透過文字記錄會議內容，並且提供搜尋功能，讓使用者可以快速找到自己需要的內容。
        </p>
        <h2>原始碼</h2>
        <p>
          你可以在{" "}
          <a
            href="https://github.com/DrJuChunKoO/TransPal-website"
            target="_blank"
          >
            GitHub
          </a>{" "}
          中，找到這個網站的原始碼和相關部署說明。
        </p>
      </div>
    </div>
  );
}
