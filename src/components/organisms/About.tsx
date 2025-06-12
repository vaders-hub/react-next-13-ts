'use client';

export default function About({ initialData }: any) {
  console.log('data', initialData);
  return <>About {initialData && <div>{initialData[0].title}</div>}</>;
}
