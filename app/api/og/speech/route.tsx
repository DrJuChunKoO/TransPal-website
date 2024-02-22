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
    const { title, date, speakers } = JSON.parse(data);
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
              marginTop: 36,
              opacity: 0.5,
            }}
          >
            {date}
          </div>
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              fontSize: 72,
              color: `rgb(31, 41, 55)`,
              fontWeight: "bold",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              color: `rgb(31, 41, 55)`,
              opacity: 0.75,
            }}
          >
            {speakers}
          </div>
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              fontSize: 36,
              color: `rgb(31, 41, 55)`,
              marginTop: 36,
              opacity: 0.5,
            }}
          >
            transpal.juchunko.com
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
