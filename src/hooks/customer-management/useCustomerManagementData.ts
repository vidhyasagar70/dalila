import { useEffect, useState, useCallback } from "react";
import { adminApi, Diamond, User } from "@/lib/api";

interface CartItem {
  stoneNo: string;
  diamond: Diamond;
  addedAt: string;
  _id: string;
}

interface HoldItem {
  stoneNo: string;
  diamond: Diamond;
  status: string;
  addedAt: string;
  _id: string;
}

interface Query {
  id: string;
  _id: string;
  userId: string;
  stoneNo: string;
  query: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  adminReply?: string;
  repliedAt?: string;
  diamond?: Diamond;
}

interface ApiResponseData {
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

export type Row = {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  company?: string;
  businessType?: string;
  vatNumber?: string;
  address?: string;
  itemsInCart?: CartItem[];
  holdedItems?: HoldItem[];
  enquiries?: Query[];
};

interface Stats {
  totalEnquiries: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface HoldData {
  holds?: Array<{
    hold?: { items?: Array<{ status?: string }> };
    items?: Array<{ status?: string }>;
    filteredItems?: Array<{ status?: string }>;
  }>;
  data?: Array<{
    hold?: { items?: Array<{ status?: string }> };
    items?: Array<{ status?: string }>;
    filteredItems?: Array<{ status?: string }>;
  }>;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  recordsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const useCustomerManagementData = (page: number = 1, limit: number = 10) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalEnquiries: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    recordsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        usersRes,
        cartsRes,
        holdsAllRes,
        holdsPendingRes,
        holdsApprovedRes,
        holdsRejectedRes,
        queriesRes,
      ] = await Promise.all([
        adminApi.getAllUsers({ page, limit }),
        adminApi.getAllCarts(),
        adminApi.getAllHolds(),
        adminApi.getAllHolds("pending"),
        adminApi.getAllHolds("approved"),
        adminApi.getAllHolds("rejected"),
        adminApi.getAllQueries(),
      ]);

        // Robust unwrapping of API responses
        const unwrap = <T,>(res: T): Record<string, unknown> | null => {
          if (res && typeof res === "object") {
            const resObj = res as ApiResponseData;
            const dataData = resObj?.data as ApiResponseData | undefined;
            if (
              dataData &&
              typeof dataData === "object" &&
              "data" in dataData
            ) {
              return dataData.data as Record<string, unknown>;
            }
            if (dataData) return dataData as Record<string, unknown>;
            return resObj as Record<string, unknown>;
          }
          return null;
        };

        const usersData = unwrap(usersRes);
        const cartsData = unwrap(cartsRes);
        const holdsAllData = unwrap(holdsAllRes);
        const holdsPendingData = unwrap(holdsPendingRes);
        const holdsApprovedData = unwrap(holdsApprovedRes);
        const holdsRejectedData = unwrap(holdsRejectedRes);
        const queriesData = unwrap(queriesRes);

        // Extract pagination info from users response
        const resObj = usersRes as unknown as ApiResponseData;
        if (resObj?.pagination) {
          const paginationData = resObj.pagination as PaginationInfo;
          setPagination({
            currentPage: paginationData.currentPage || page,
            totalPages: paginationData.totalPages || 1,
            totalRecords: paginationData.totalRecords || 0,
            recordsPerPage: paginationData.recordsPerPage || limit,
            hasNextPage: paginationData.hasNextPage || false,
            hasPrevPage: paginationData.hasPrevPage || false,
          });
        }

        // Users - now comes from data array directly
        const users = (usersData?.users ??
          usersData?.data ??
          (Array.isArray(usersData) ? usersData : []) ??
          []) as User[];

        // Carts: admin/all returns array with shape { cart: {..., userId}, user: { userId, ... }, totalItems }
        const cartsArr = (cartsData?.carts ??
          cartsData?.data ??
          (Array.isArray(cartsData) ? cartsData : []) ??
          []) as Array<{
          cart: { userId: string; items: CartItem[] };
          user: User;
          totalItems: number;
        }>;

        // Holds: admin/all returns array with shape { hold: {..., userId, items: [...]}, user: {...} }
        const holdsAll = (holdsAllData?.holds ??
          holdsAllData?.data ??
          (Array.isArray(holdsAllData) ? holdsAllData : []) ??
          []) as Array<{
          hold: { userId: string; items: HoldItem[] };
          user: User;
        }>;

        // Queries: admin/all returns data.groupedQueries -> [ { email, queries: [...] } ]
        let queries: Query[] = [];
        if (
          queriesData?.groupedQueries &&
          Array.isArray(queriesData.groupedQueries)
        ) {
          queries = (
            queriesData.groupedQueries as Array<{ queries: Query[] }>
          ).flatMap((g) => (Array.isArray(g.queries) ? g.queries : []));
        } else if (queriesData?.queries && Array.isArray(queriesData.queries)) {
          queries = queriesData.queries as Query[];
        } else if (Array.isArray(queriesData)) {
          queries = queriesData as Query[];
        }

        // Build lookup maps by userId
        const cartByUser: Record<string, CartItem[]> = {};
        cartsArr.forEach((c) => {
          const uid: string = (c.cart?.userId ||
            c.user?.userId ||
            c.user?._id ||
            (c.user as Record<string, unknown>).id ||
            "") as string;
          if (!uid) return;
          const items = c.cart?.items || [];
          items.forEach((it) => {
            if (!cartByUser[uid]) cartByUser[uid] = [];
            cartByUser[uid].push(it);
          });
        });

        const holdsByUser: Record<string, HoldItem[]> = {};
        holdsAll.forEach((h) => {
          const uid: string = (h.hold?.userId ||
            h.user?.userId ||
            h.user?._id ||
            (h.user as Record<string, unknown>).id ||
            "") as string;
          if (!uid) return;
          const items = h.hold?.items || [];
          items.forEach((it) => {
            if (!holdsByUser[uid]) holdsByUser[uid] = [];
            holdsByUser[uid].push(it);
          });
        });

        const queriesByUser: Record<string, Query[]> = {};
        queries.forEach((q) => {
          const uid: string = q.userId || "";
          if (!uid || typeof uid !== "string") return;
          queriesByUser[uid] = queriesByUser[uid] || [];
          queriesByUser[uid].push(q);
        });

        // Compose table rows from users
        const composed: Row[] = (users || []).map((u: User) => {
          const userId =
            u.id ||
            u._id ||
            ((u as Record<string, unknown>).userId as string) ||
            "";
          return {
            id: userId,
            name:
              `${u.firstName || ""} ${u.lastName || ""}`.trim() ||
              u.username ||
              u.email,
            username: u.username,
            email: u.email,
            phone: u.customerData?.phoneNumber,
            company: u.customerData?.businessInfo?.companyName,
            businessType: u.customerData?.businessInfo?.businessType,
            vatNumber: u.customerData?.businessInfo?.vatNumber,
            address: [
              u.customerData?.address?.street,
              u.customerData?.address?.city,
              u.customerData?.address?.country,
            ]
              .filter(Boolean)
              .join(", "),
            itemsInCart: cartByUser[userId] || [],
            holdedItems: holdsByUser[userId] || [],
            enquiries: queriesByUser[userId] || [],
          };
        });

        setRows(composed);

        // Count holds by status robustly, supporting either filteredItems or full items list
        const countStatus = (
          dataset: Record<string, unknown> | null,
          status: string,
        ) => {
          if (!dataset) return 0;
          const holdData = dataset as HoldData;
          const arr =
            holdData?.holds ??
            holdData?.data ??
            (Array.isArray(dataset) ? dataset : []);
          if (!Array.isArray(arr)) return 0;
          return arr.reduce((sum, h) => {
            if (Array.isArray(h.filteredItems))
              return sum + h.filteredItems.length;
            const items = h.hold?.items || h.items || [];
            return (
              sum +
              items.filter((it: { status?: string }) => it?.status === status)
                .length
            );
          }, 0);
        };

        setStats({
          totalEnquiries: queries.length,
          pending: countStatus(holdsPendingData, "pending"),
          approved: countStatus(holdsApprovedData, "approved"),
          rejected: countStatus(holdsRejectedData, "rejected"),
        });
      } catch (e: unknown) {
        const error = e as { message?: string };
        console.error("Failed to load admin data", e);
        setError(error?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
  }, [page, limit]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    rows,
    setRows,
    loading,
    error,
    stats,
    setStats,
    pagination,
    refetch: fetchAll,
  };
};

