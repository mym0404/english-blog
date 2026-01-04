import { ImageResponse } from "@takumi-rs/image-response";

import { notFound } from "next/navigation";
import { getPageImage, source } from "@/lib/source";
import {
  getBackgroundSrc,
  getImageResponseOptions,
  getLogoSrc,
  generate as MetadataImage,
} from "./generate";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) => {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const [logoSrc, backgroundSrc, options] = await Promise.all([
    getLogoSrc(),
    getBackgroundSrc(),
    getImageResponseOptions(),
  ]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const title = truncateText(page.data.title, 100);
  const description = page.data.description
    ? truncateText(page.data.description, 400)
    : undefined;

  let teaserSrc: string | undefined;
  if (page.data.teaser) {
    try {
      const teaserResponse = await fetch(page.data.teaser);
      const teaserArrayBuffer = await teaserResponse.arrayBuffer();
      const teaserBuffer = Buffer.from(teaserArrayBuffer);
      teaserSrc = `data:image/png;base64,${teaserBuffer.toString("base64")}`;
    } catch (error) {
      console.error("Failed to fetch teaser image:", error);
    }
  }

  return new ImageResponse(
    <MetadataImage
      title={title}
      description={description}
      logoSrc={logoSrc}
      backgroundSrc={backgroundSrc}
      teaser={teaserSrc}
    />,
    options,
  );
};

export const generateStaticParams = () =>
  source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
