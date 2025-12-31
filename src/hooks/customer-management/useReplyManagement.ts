import { useState } from "react";
import { adminApi } from "@/lib/api";
import toast from "react-hot-toast";
import { Row } from "./useCustomerManagementData";

interface ReplyModal {
  open: boolean;
  queryId: string;
  stoneNo: string;
}

export const useReplyManagement = (
  setRows: React.Dispatch<React.SetStateAction<Row[]>>
) => {
  const [replyModal, setReplyModal] = useState<ReplyModal | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyModal || !replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    try {
      setIsSubmittingReply(true);
      const response = await adminApi.replyToQuery(
        replyModal.queryId,
        replyText.trim(),
      );

      if (response?.success) {
        toast.success("Reply sent successfully!");

        // Update the state directly instead of reloading
        setRows((prevRows) =>
          prevRows.map((row) => ({
            ...row,
            enquiries: row.enquiries?.map((query) =>
              query.id === replyModal.queryId || query._id === replyModal.queryId
                ? {
                    ...query,
                    status: "replied",
                    adminReply: replyText.trim(),
                    repliedAt: new Date().toISOString(),
                  }
                : query
            ),
          }))
        );

        setReplyModal(null);
        setReplyText("");
      } else {
        toast.error(response?.message || "Failed to send reply");
      }
    } catch (error: unknown) {
      console.error("Error sending reply:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        toast.error(
          axiosError?.response?.data?.message || "Failed to send reply",
        );
      } else {
        toast.error("Failed to send reply");
      }
    } finally {
      setIsSubmittingReply(false);
    }
  };

  return {
    replyModal,
    setReplyModal,
    replyText,
    setReplyText,
    isSubmittingReply,
    handleReplySubmit,
  };
};

