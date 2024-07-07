interface Props {
  params: { id: number };
}

export default function Page({ params }: Props) {
  return (
    <main>
      <div>{params.id}</div>
    </main>
  );
}
