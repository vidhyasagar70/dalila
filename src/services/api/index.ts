/**
 * API Services - Main Export Index for future use
 */

export { apiClient, API_URL } from "./base/apiClient";
export {
  getAuthToken,
  getAuthTokenFromCookies,
  isAuthenticated,
  setAuthToken,
  removeAuthToken,
  handleUnauthorized,
  getCurrentUser,
  setCurrentUser,
  UNAUTHORIZED_EVENT,
} from "./base/authHandler";
export {
  extractErrorMessage,
  isAxiosError,
  getHttpStatusMessage,
  handleApiError,
  logError,
  type ApiError,
} from "./base/errorHandler";


// TYPE EXPORTS

export type {
  ApiResponse,
  PaginationMeta,
  PaginatedResponse,
  FetchParams,
  FilterOptions,
  DashboardStats,
} from "./types/api.types";

export type {
  Diamond,
  LimitedEditionDiamond,
  DiamondSearchFilters,
  LimitedEditionFilters,
} from "./types/diamond.types";

export type {
  User,
  CustomerData,
  LoginCredentials,
  RegistrationData,
  AuthResponse,
  CartItem,
  CartResponse,
  Quotation,
  Blog,
  BlogPaginationData,
} from "./types/user.types";


// DIAMOND SERVICES

export {
  getAllDiamonds,
  getDiamondById,
  getDashboardStats,
  syncDiamonds,
  refreshDiamonds,
  emailDiamonds,
  getLimitedEditionDiamonds,
  saveLimitedEditionFilters,
} from "./diamond/diamondService";

export {
  getFilterOptions,
  searchDiamonds,
} from "./diamond/diamondFilterService";


// USER SERVICES

export {
  login,
  register,
  logout,
  sendOtp,
  verifyOtp,
  updatePassword,
} from "./user/authService";

export {
  getProfile,
  submitCustomerData,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  submitContactForm,
} from "./user/userService";


// CART & QUERY SERVICES

export {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "./cart/cartService";

export {
  addToHold,
  getHoldItems,
} from "./cart/holdService";

export {
  createQuery,
  getUserQueries,
} from "./cart/queryService";


// ADMIN SERVICES

export {
  getPendingCustomerData,
  approveCustomerData,
  rejectCustomerData,
  createAdmin,
  getAdminList,
  deleteAdmin,
  getAllHolds,
  approveHold,
  rejectHold,
  getAllQueries,
  replyToQuery,
  getAllCarts,
} from "./admin/adminService";

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./admin/blogService";

export {
  submitSellDiamondForm,
  getGroupedSubmissions,
  updateSubmissionStatus,
} from "./admin/formService";

export {
  getAllInventoryDiamonds,
  searchInventoryDiamonds,
  updateSupplierVisibility,
  getSuppliers,
  applySupplierFilters,
  getSupplierFilters,
} from "./admin/inventoryService";


