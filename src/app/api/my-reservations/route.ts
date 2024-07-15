import { NextRequest, NextResponse } from 'next/server';
import makeQueryString from '@/lib/query-string';
import { AxiosError } from 'axios';
import { axiosByServer } from '@/app/(action)/axios';

export async function GET(req: NextRequest) {
  try {
    const path = '/my-reservations';
    const queryParams = Object.fromEntries(req.nextUrl.searchParams);
    const queryString = makeQueryString(queryParams);
    const url = `${path}${queryString}`;

    const response = await axiosByServer.get(url);
    const { data, status } = response;

    return NextResponse.json(data, { status });
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: err.message,
          status: err.response?.status || 500,
          data: err.response?.data || null,
        },
        { status: err.response?.status || 500 },
      );
    }

    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        status: 500,
      },
      { status: 500 },
    );
  }
}
