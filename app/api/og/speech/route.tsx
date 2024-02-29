import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
            <div
              style={{
                fontSize: 64,
                color: `rgb(31, 41, 55)`,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 48,
                color: `rgb(55, 65, 81)`,
                opacity: 0.75,
              }}
            >
              {speakers}
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
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              style={{
                display: "flex",
                color: "white",
                opacity: 0.5,
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
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
