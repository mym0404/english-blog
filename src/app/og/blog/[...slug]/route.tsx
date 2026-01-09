import { ImageResponse } from "@takumi-rs/image-response";

import { notFound } from "next/navigation";
import { blog, getBlogPageImage } from "@/lib/source";
import {
  getBackgroundSrc,
  getImageResponseOptions,
  getLogoSrc,
  generate as MetadataImage,
} from "../../docs/[...slug]/generate";

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: RouteContext<"/og/blog/[...slug]">,
) => {
  const { slug } = await params;
  const page = blog.getPage(slug.slice(0, -1));
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

  return new ImageResponse(
    <MetadataImage
      title={title}
      description={description}
      logoSrc={logoSrc}
      backgroundSrc={backgroundSrc}
    />,
    options,
  );
};

export const generateStaticParams = () =>
  blog.getPages().map((page) => ({
    slug: getBlogPageImage(page).segments,
  }));
