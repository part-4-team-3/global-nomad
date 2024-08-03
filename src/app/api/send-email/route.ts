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
      subject: 'GlobalNomad Email Verification',
      html: `
      <center>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" bgcolor="#17191c" style="padding: 50px 0;">
              <table width="500" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="font-size: 48px; line-height: 52px; font-family: Arial, sans-serif, 'Motiva Sans'; color: #3a9aed; font-weight: bold;">
                    <p style="color: white; margin: 0;">인증번호</p>
                    <p style="margin: 20px 0;">${code}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </center>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ code }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
