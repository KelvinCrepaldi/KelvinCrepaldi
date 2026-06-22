import { ImageResponse } from "next/og";

import { siteConfig } from "@/_utils/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#363322",
          color: "#fef9ed",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >

        <p
          style={{
            fontSize: 72,
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            marginBottom: 32,
          }}
        >
          Kelvin Crepaldi
        </p>
        <p style={{ fontSize: 28, opacity: 0.85 }}>
          Desenvolvedor de Software · Curitiba, Brasil
        </p>
      </div>
    ),
    { ...size },
  );
}
