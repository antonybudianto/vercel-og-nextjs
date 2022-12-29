import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    return new ImageResponse(
      (
        <div
          style={{
            background: "#000",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 120px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              textAlign: "left",
              justifyContent: "center",
              flexDirection: "column",
              flexWrap: "nowrap",
              width: "80%",
            }}
          >
            <div
              style={{
                fontSize: 50,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                color: "white",
                lineHeight: 1.4,
                whiteSpace: "pre-wrap",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 30,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                color: "lightgray",
                margin: "30px 0",
                lineHeight: 1.4,
                whiteSpace: "pre-wrap",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>antonybudianto.com/blog</div>
              <div
                style={{
                  color: "lightcyan",
                }}
              >
                @antonybudianto
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="avatar"
              width="200"
              src={`https://avatars.githubusercontent.com/u/7658554?v=4`}
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
