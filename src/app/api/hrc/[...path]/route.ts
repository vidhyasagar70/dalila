import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_URL || 'http://hrcdiamonds.com/HRCProvideStock.svc';

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(req, params, 'GET');
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(req, params, 'POST');
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(req, params, 'PUT');
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(req, params, 'DELETE');
}

async function handleRequest(req: NextRequest, params: { path: string[] }, method: string) {
  const { searchParams } = req.nextUrl;
  const path = params.path.join('/');

  try {
    // ✅ Corrected: Removed extra `/api/` from the target URL
    const targetUrl =
      method === 'GET'
        ? `${BASE_URL}/${path}?${searchParams.toString()}`
        : `${BASE_URL}/${path}`;

    console.log(`🔗 Proxying ${method} request to: ${targetUrl}`);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (method !== 'GET') {
      options.body = await req.text();
    }

    const response = await fetch(targetUrl, options);
    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      console.error(`Error details: ${errorText}`);
      return NextResponse.json(
        {
          error: 'API Error',
          status: response.status,
          message: response.statusText,
        },
        { status: response.status }
      );
    }

    // 🧠 Handle JSON or XML responses
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        headers: { 'Content-Type': contentType },
      });
    }
  } catch (err: any) {
    console.error('🔥 Proxy Error:', err);
    return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
  }
}
