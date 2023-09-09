interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function News({ params }: PageProps) {
  return <main></main>;
}
