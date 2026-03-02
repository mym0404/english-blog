/** biome-ignore-all lint/performance/noImgElement: required for OG image generation */
import { readFile } from "node:fs/promises";
import type { ImageResponseOptions } from "@takumi-rs/image-response";
import type { ReactNode } from "react";

type GenerateProps = {
  title: ReactNode;
  description?: ReactNode;
  logoSrc: string;
  backgroundSrc: string;
  teaser?: string;
};

const fontRegular = readFile("./public/fonts/Pretendard-Regular.otf").then(
  (data) => ({
    name: "Pretendard",
    data,
    weight: 400,
  }),
);
const fontBold = readFile("./public/fonts/Pretendard-Bold.otf").then(
  (data) => ({
    name: "Pretendard",
    data,
    weight: 700,
  }),
);
const logo = readFile("./public/images/icon128.png").then(
  (data) => `data:image/png;base64,${data.toString("base64")}`,
);
const background = readFile("./public/images/noise-background.png").then(
  (data) => `data:image/png;base64,${data.toString("base64")}`,
);

export const getLogoSrc = async () => logo;
export const getBackgroundSrc = async () => background;

export const getImageResponseOptions = async () =>
  ({
    width: 1200,
    height: 630,
    format: "webp",
    fonts: await Promise.all([fontRegular, fontBold]),
  }) satisfies ImageResponseOptions;

export const generate = ({
  title,
  description,
  logoSrc,
  backgroundSrc,
  teaser,
}: GenerateProps) => {
  const primaryTextColor = "rgb(240,240,240)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        color: "white",
        fontFamily: "Pretendard",
        position: "relative",
      }}
    >
      <img
        alt={"background"}
        src={backgroundSrc}
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {teaser ? (
        <>
          <img
            alt={"teaser"}
            src={teaser}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "linear-gradient(to bottom right, rgba(0,0,0,0.92) 25%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "64px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "1.1",
          }}
        >
          {title}
        </span>
        {description ? (
          <p
            style={{
              fontSize: "28px",
              color: "rgba(240,240,240,0.7)",
              marginTop: "24px",
              marginBottom: "0",
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: primaryTextColor,
          backgroundImage:
            "linear-gradient(135deg, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.55) 100%)",
          borderTopLeftRadius: "24px",
          padding: "12px 24px 12px 28px",
        }}
      >
        <img
          alt={"logo"}
          src={logoSrc}
          width={28}
          height={28}
          style={{
            borderRadius: "10px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            나의
          </span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            영어여행
          </span>
        </div>
      </div>
    </div>
  );
};
