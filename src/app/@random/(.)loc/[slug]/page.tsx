interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ModalLoc({ params }: PageProps) {
  console.log('ModalLoc', params);
  return <></>;
}
