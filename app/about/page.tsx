export default function Page() {
  return (
    <div className="container my-10">
      <div className="text-4xl font-bold text-gray-800 mb-4">關於</div>
      <div className="text-gray-700">
        TransPal
        是一個會議記錄網站，透過文字記錄會議內容，並且提供搜尋功能，讓使用者可以快速找到自己需要的內容。
      </div>
      <div className="text-2xl font-bold text-gray-800 my-4">架構</div>
      <div className="text-gray-700">
        TransPal 由三個部分組成：轉錄工具、編輯器與網站（你目前看的這個）
      </div>
      <div className="text-2xl font-bold text-gray-800 my-4">原始碼</div>
      <div className="text-gray-700">
        TransPal 完全開源，你可以在 GitHub 上找到所有的原始碼。
      </div>
    </div>
  );
}
