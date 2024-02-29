import { ImageResponse } from "next/og";
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
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              backgroundColor: "white",
              padding: "50px 100px",
              width: "1000px",
            }}
          >
            {" "}
            <div
              style={{
                fontSize: 64,
                color: `rgb(31, 41, 55)`,
              }}
            >
              {speaker}
            </div>
            <div
              style={{
                fontSize: 48,
                color: `rgb(55, 65, 81)`,
                opacity: 0.75,
              }}
            >
              {message}
            </div>
            <div style={{ flex: 1 }}></div>
            <div
              style={{
                backgroundColor: "rgb(31, 41, 55)",
                height: "2px",
                opacity: 0.125,
                width: "100%",
                borderRadius: "1px",
                margin: "16px 0",
              }}
            />
            <div
              style={{
                fontSize: 36,
                color: `rgb(107, 114, 128)`,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{title}</span>
              <span>{date}</span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#6ECC93",
              display: "flex",
              width: "200px",
              height: "100%",
              padding: "25px",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style={{
                display: "flex",
                color: "white",
                opacity: 0.5,
              }}
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "fluentFlat",
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
