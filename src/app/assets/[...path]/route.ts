import fs from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const ASSET_ROUTE_PREFIX = "/assets/";
const ASSET_ROOT = path.resolve(process.cwd(), "content", "assets");

const toAssetPath = ({ pathname }: { pathname: string }) => {
  if (!pathname.startsWith(ASSET_ROUTE_PREFIX)) {
    return null;
  }

  const encodedPath = pathname.slice(ASSET_ROUTE_PREFIX.length);
  if (!encodedPath) {
    return null;
  }

  let decodedPath = "";
  try {
    decodedPath = decodeURIComponent(encodedPath);
  } catch {
    return null;
  }

  const resolvedPath = path.resolve(ASSET_ROOT, decodedPath);
  const withinRoot =
    resolvedPath === ASSET_ROOT ||
    resolvedPath.startsWith(`${ASSET_ROOT}${path.sep}`);

  if (!withinRoot) {
    return null;
  }

  return resolvedPath;
};

const getContentType = ({ extension }: { extension: string }) => {
  switch (extension) {
    case "apng":
      return "image/apng";
    case "avif":
      return "image/avif";
    case "gif":
      return "image/gif";
    case "jpeg":
      return "image/jpeg";
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    case "webp":
      return "image/webp";
    case "m4v":
      return "video/x-m4v";
    case "mov":
      return "video/quicktime";
    case "mp4":
      return "video/mp4";
    case "ogv":
      return "video/ogg";
    case "webm":
      return "video/webm";
    case "pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
};

type ErrorWithCode = Error & { code?: string };

const isErrorWithCode = (value: unknown): value is ErrorWithCode =>
  value instanceof Error && "code" in value;

const createNotFoundResponse = () => new Response("Not found", { status: 404 });

export const GET = async (request: NextRequest) => {
  const assetPath = toAssetPath({ pathname: request.nextUrl.pathname });
  if (!assetPath) {
    return createNotFoundResponse();
  }

  try {
    const file = await fs.readFile(assetPath);
    const extension = path.extname(assetPath).slice(1).toLowerCase();
    const contentType = getContentType({ extension });

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    if (isErrorWithCode(error) && error.code === "ENOENT") {
      return createNotFoundResponse();
    }

    return new Response("Failed to read asset", { status: 500 });
  }
};
