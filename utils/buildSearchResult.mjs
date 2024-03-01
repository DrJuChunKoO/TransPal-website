import fs from "fs";
async function buildSearchResult() {
  let result = [];
  const speechList = fs
    .readdirSync("./public/speeches")
    .filter((file) => file.endsWith(".json"));
  console.log(speechList);
  for (const speech of speechList) {
    const speechData = JSON.parse(
      fs.readFileSync(`./public/speeches/${speech}`)
    );
    const { info, content } = speechData;
    result.push({
      name: info.name,
      date: info.date,
      url: `/speeches/${info.date}%20${info.slug}`,
      content: content.map(({ id, text, speaker }) => ({
        id,
        text,
        speaker,
      })),
    });
  }
  fs.writeFileSync("./public/searchResult.json", JSON.stringify(result));
}
buildSearchResult();
