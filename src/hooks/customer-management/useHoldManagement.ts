import { useState } from "react";
import { adminApi } from "@/lib/api";
import toast from "react-hot-toast";
import { Row } from "./useCustomerManagementData";

interface Stats {
  totalEnquiries: number;
  pending: number;
  approved: number;
  rejected: number;
}

export const useHoldManagement = (
  setRows: React.Dispatch<React.SetStateAction<Row[]>>,
  setStats: React.Dispatch<React.SetStateAction<Stats>>
) => {
  const [processingHoldId, setProcessingHoldId] = useState<string | null>(null);

  const handleApproveHold = async (holdId: string) => {
    if (!holdId) {
      toast.error("Invalid hold item");
      return;
    }

    try {
      setProcessingHoldId(holdId);
      const response = await adminApi.approveHold(holdId);

      if (response?.success) {
        toast.success("Hold item approved successfully!");

        // Update the state directly instead of reloading
        setRows((prevRows) =>
          prevRows.map((row) => ({
            ...row,
            holdedItems: row.holdedItems?.map((item) =>
              item._id === holdId ? { ...item, status: "approved" } : item
            ),
          }))
        );

        // Update stats
        setStats((prev) => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          approved: prev.approved + 1,
        }));
      } else {
        toast.error(response?.message || "Failed to approve hold item");
      }
    } catch (error: unknown) {
      console.error("Error approving hold:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(
          axiosError?.response?.data?.message || "Failed to approve hold item",
        );
      } else {
        toast.error("Failed to approve hold item");
      }
    } finally {
      setProcessingHoldId(null);
    }
  };

  const handleDeclineHold = async (holdId: string) => {
    if (!holdId) {
      toast.error("Invalid hold item");
      return;
    }

    try {
      setProcessingHoldId(holdId);
      const response = await adminApi.rejectHold(holdId);

      if (response?.success) {
        toast.success("Hold item declined successfully!");

        // Update the state directly instead of reloading
        setRows((prevRows) =>
          prevRows.map((row) => ({
            ...row,
            holdedItems: row.holdedItems?.map((item) =>
              item._id === holdId ? { ...item, status: "rejected" } : item
            ),
          }))
        );

        // Update stats
        setStats((prev) => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          rejected: prev.rejected + 1,
        }));
      } else {
        toast.error(response?.message || "Failed to decline hold item");
      }
    } catch (error: unknown) {
      console.error("Error declining hold:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(
          axiosError?.response?.data?.message || "Failed to decline hold item",
        );
      } else {
        toast.error("Failed to decline hold item");
      }
    } finally {
      setProcessingHoldId(null);
    }
  };

  return {
    processingHoldId,
    handleApproveHold,
    handleDeclineHold,
  };
};

