import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text }: Props) {
  return <button className="bg-var-green-dark">{text}dd</button>;
}
