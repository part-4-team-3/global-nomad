import transporter from '@/lib/nodemailer';
import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const code = randomBytes(6).toString('hex');

    const mailOptions = {
      from: '"GlobalNomad" <globalnomad5.part4.3@gmail.com>',
      to: email,
      subject: 'GlobalNomad의 이메일 인증번호를 확인하세요',
      html: `
      <center style="font-family:pretendard">
        <div style="display: flex; flex-direction: column; gap: 20px; justify-content: center;  align-items: center; background-color: #fafafa;">
          <h1>
            <img src="https://glabal-nomad.vercel.app/logo-big.svg" style="width: 340px; max-width: 80%;" />
          </h1>
          <div style="width: 500px; font-size: 20px; background-color: white; max-width: 90%; padding: 30px;">
            <p>안녕하세요. 글로벌노마드에서 요청하신 인증번호를 보내드립니다.</p>
            <data style="font-weight: 700; font-size: 25px; padding-y: 20px;">${code}</data>
            <p>위 인증번호를 인증번호 입력창에 입력해 주세요.</p>
          </div>
        </div>
      </center>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ code }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
