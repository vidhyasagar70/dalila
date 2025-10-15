//api/hrc/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

// FIXED: Remove trailing slash and ensure proper URL construction
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://hrcdiamonds.com/HRCProvideStock.svc";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const path = params.path.join("/");

    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // FIXED: Proper URL construction
    const url = `${API_BASE_URL}/${path}${queryString ? `?${queryString}` : ""}`;

    console.log("🔗 Proxying GET request to:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("❌ API Error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);

      return NextResponse.json(
        {
          error: "API request failed",
          status: response.status,
          message: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log("✅ API Response received:", {
      status: response.status,
      hasToken: !!(data.Token || data.token),
    });

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("❌ Proxy error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch data from API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const path = params.path.join("/");

    const body = await request.json();

    // FIXED: Proper URL construction
    const url = `${API_BASE_URL}/${path}`;

    console.log("🔗 Proxying POST request to:", url);
    console.log("📦 Request body:", body);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("❌ API Error:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);

      return NextResponse.json(
        {
          error: "API request failed",
          status: response.status,
          message: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log("✅ API Response received");

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("❌ Proxy error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch data from API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const path = params.path.join("/");
    const body = await request.json();
    const url = `${API_BASE_URL}/${path}`;

    console.log("🔗 Proxying PUT request to:", url);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, errorText);

      return NextResponse.json(
        { error: "API request failed", message: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("❌ Proxy error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch data from API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const path = params.path.join("/");
    const url = `${API_BASE_URL}/${path}`;

    console.log("🔗 Proxying DELETE request to:", url);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, errorText);

      return NextResponse.json(
        { error: "API request failed", message: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("❌ Proxy error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch data from API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}