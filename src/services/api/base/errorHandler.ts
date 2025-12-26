/**
 * Error Handler ,Centralized error handling for API requests
 */

import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

// Extract error message from Axios error
export const extractErrorMessage = (error: unknown): string => {
  if (!error) return "An unknown error occurred";

  // Handle Axios errors
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      error?: string;
      message?: string;
      success?: boolean;
    }>;

    // Check response data
    if (axiosError.response?.data) {
      const data = axiosError.response.data;
      return data.error || data.message || "Request failed";
    }

    // Network errors
    if (axiosError.code === "ECONNABORTED") {
      return "Request timeout. Please try again.";
    }
    if (axiosError.code === "ERR_NETWORK") {
      return "Network error. Please check your connection.";
    }

    // HTTP status messages
    if (axiosError.response?.status) {
      return getHttpStatusMessage(axiosError.response.status);
    }

    return axiosError.message || "Request failed";
  }

  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error occurred";
};

// Type guard for Axios errors
export const isAxiosError = (error: unknown): error is AxiosError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
};

// Get user-friendly message for HTTP status codes
export const getHttpStatusMessage = (status: number): string => {
  const messages: Record<number, string> = {
    400: "Bad request. Please check your input.",
    401: "Unauthorized. Please log in.",
    403: "Access forbidden. You don't have permission.",
    404: "Resource not found.",
    408: "Request timeout. Please try again.",
    409: "Conflict. This resource already exists.",
    422: "Invalid data provided.",
    429: "Too many requests. Please slow down.",
    500: "Server error. Please try again later.",
    502: "Bad gateway. Server is unreachable.",
    503: "Service unavailable. Please try again later.",
    504: "Gateway timeout. Please try again.",
  };

  return messages[status] || `Request failed with status ${status}`;
};

// Handle API error and return formatted error object
export const handleApiError = (error: unknown): ApiError => {
  const message = extractErrorMessage(error);
  
  let status: number | undefined;
  let code: string | undefined;
  let details: unknown;

  if (isAxiosError(error)) {
    status = error.response?.status;
    code = error.code;
    details = error.response?.data;
  }

  return {
    message,
    status,
    code,
    details,
  };
};

// Log error to console (can be extended to send to error tracking service)
export const logError = (
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
): void => {
  console.error(`[${context}] Error:`, {
    error: handleApiError(error),
    ...additionalInfo,
    timestamp: new Date().toISOString(),
  });
};


