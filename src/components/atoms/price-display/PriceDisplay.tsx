interface Props {
  price: number;
  fontSize?: number;
}

export default function PriceDisplay({ price, fontSize = 20 }: Props) {
  const style = `text-${fontSize}pxr font-[700]`;
  return <span className={`${style}`}>₩ {price.toLocaleString('en-US')}</span>;
}
