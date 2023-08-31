export default function Layout(props: { children: React.ReactNode; lefty: React.ReactNode; righty: React.ReactNode }) {
  return (
    <>
      {props.children}
      <div>{props.lefty}</div>
      <div>{props.righty}</div>
    </>
  );
}
