import { NextRequest, NextResponse } from "next/server";

const HRC_API_BASE = "http://hrcdiamonds.com/HRCProvideStock.svc";

// Handle GET requests
export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        // Get the path from the URL (e.g., /login)
        const path = params.path.join("/");
        
        // Get all query parameters from the request
        const searchParams = request.nextUrl.searchParams;
        const queryString = searchParams.toString();
        
        // Construct the full URL to the HRC API
        const url = `${HRC_API_BASE}/${path}${queryString ? `?${queryString}` : ""}`;
        
        console.log("Proxying GET request to:", url);

        // Make the request to the actual HRC API
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            cache: "no-store", 
        });

        // Check if response is ok
        if (!response.ok) {
            console.error("HRC API Error:", response.status, response.statusText);
            const errorText = await response.text();
            console.error("Error details:", errorText);
            
            return NextResponse.json(
                { 
                    error: "API request failed",
                    status: response.status,
                    message: errorText 
                },
                { status: response.status }
            );
        }

        // Parse the response
        const data = await response.json();
        
        console.log("API Response received:", {
            status: response.status,
            hasToken: !!(data.Token || data.token)
        });

        // Return the response with CORS headers
        return NextResponse.json(data, {
            status: response.status,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    } catch (error) {
        console.error("Proxy error:", error);
        
        return NextResponse.json(
            { 
                error: "Failed to fetch data from HRC API",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

// Handle POST requests
export async function POST(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        // Get the path from the URL
        const path = params.path.join("/");
        
        // Get the request body
        const body = await request.json();
        
        // Construct the full URL
        const url = `${HRC_API_BASE}/${path}`;
        
        console.log("Proxying POST request to:", url);
        console.log("Request body:", body);

        // Make the request to the actual HRC API
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        // Check if response is ok
        if (!response.ok) {
            console.error("HRC API Error:", response.status, response.statusText);
            const errorText = await response.text();
            console.error("Error details:", errorText);
            
            return NextResponse.json(
                { 
                    error: "API request failed",
                    status: response.status,
                    message: errorText 
                },
                { status: response.status }
            );
        }

        // Parse the response
        const data = await response.json();
        
        console.log("API Response received");

        // Return the response with CORS headers
        return NextResponse.json(data, {
            status: response.status,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
        });
    } catch (error) {
        console.error("Proxy error:", error);
        
        return NextResponse.json(
            { 
                error: "Failed to fetch data from HRC API",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

// Handle PUT requests
export async function PUT(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const path = params.path.join("/");
        const body = await request.json();
        const url = `${HRC_API_BASE}/${path}`;
        
        console.log("Proxying PUT request to:", url);

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("HRC API Error:", response.status, errorText);
            
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
        console.error("Proxy error:", error);
        
        return NextResponse.json(
            { 
                error: "Failed to fetch data from HRC API",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

// Handle DELETE requests
export async function DELETE(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    try {
        const path = params.path.join("/");
        const url = `${HRC_API_BASE}/${path}`;
        
        console.log("Proxying DELETE request to:", url);

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("HRC API Error:", response.status, errorText);
            
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
        console.error("Proxy error:", error);
        
        return NextResponse.json(
            { 
                error: "Failed to fetch data from HRC API",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

// Handle OPTIONS requests (CORS preflight)
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
    });
}