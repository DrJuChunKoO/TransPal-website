import { ImageResponse } from "next/og";
import { getSpeech } from "@/utils/speeches";
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // ?title=<title>
  // &date=<date>
  // &speakers=<speakers>
  const data = searchParams.get("data");

  if (data) {
    const { title, date, message, speaker } = JSON.parse(data);
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "50px 100px",
          }}
        >
          <div
            style={{
              fontSize: 36,
              color: `rgb(31, 41, 55)`,
              opacity: 0.5,
            }}
          >
            {title}
          </div>
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              fontSize: 36,
              color: `rgb(31, 41, 55)`,
              opacity: 0.75,
            }}
          >
            {speaker}
          </div>
          <div
            style={{
              fontSize: 72,
              color: `rgb(31, 41, 55)`,
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              fontSize: 36,
              color: `rgb(31, 41, 55)`,
              opacity: 0.5,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>{date}</span>
            <span>transpal.juchunko.com</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 12,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {searchParams.toString()}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
