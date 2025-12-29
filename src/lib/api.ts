/**
 This file import in all ui page so it make conflict for update struture
  so importing all in thi file and re-exports all services from the new update structure.
   before it has 2,510 lines →now refactor into 180 lines 
 */

// Import all services
import * as diamondService from "../services/api/diamond/diamondService";
import * as diamondFilterService from "../services/api/diamond/diamondFilterService";
import * as authService from "../services/api/user/authService";
import * as userService from "../services/api/user/userService";
import * as cartService from "../services/api/cart/cartService";
import * as holdService from "../services/api/cart/holdService";
import * as queryService from "../services/api/cart/queryService";
import * as adminService from "../services/api/admin/adminService";
import * as blogService from "../services/api/admin/blogService";
import * as formService from "../services/api/admin/formService";
import * as inventoryService from "../services/api/admin/inventoryService";

// Re-export services and types
export * from "../services/api/base/apiClient";
export * from "../services/api/base/authHandler";
export * from "../services/api/base/errorHandler";
export * from "../services/api/types/api.types";
export * from "../services/api/types/diamond.types";
export * from "../services/api/types/user.types";



// Diamond API, All diamond-related operations
export const diamondApi = {
  // From diamondService
  getAll: diamondService.getAllDiamonds,
  getById: diamondService.getDiamondById,
  getDashboardStats: diamondService.getDashboardStats,
  sync: diamondService.syncDiamonds,
  refresh: diamondService.refreshDiamonds,
  email: diamondService.emailDiamonds,
  getLimitedEdition: diamondService.getLimitedEditionDiamonds,
  saveLimitedEditionFilters: diamondService.saveLimitedEditionFilters,
  
  // From diamondFilterService
  getFilterOptions: diamondFilterService.getFilterOptions,
  search: diamondFilterService.searchDiamonds,
};


// User API, Authentication and user management
export const userApi = {
  // From authService
  login: authService.login,
  register: authService.register,
  logout: authService.logout,
  sendOtp: authService.sendOtp,
  verifyOtp: authService.verifyOtp,
  updatePassword: authService.updatePassword,
  
  // From userService
  getProfile: userService.getProfile,
  submitCustomerData: userService.submitCustomerData,
  getAll: userService.getAllUsers,
  getAllUsers: userService.getAllUsers, 
  getById: userService.getUserById,
  update: userService.updateUser,
  delete: userService.deleteUser,
  search: userService.searchUsers,
  submitContactForm: userService.submitContactForm,
  
  // Admin methods 
  getPendingCustomerData: adminService.getPendingCustomerData,
  approveCustomerData: adminService.approveCustomerData,
  rejectCustomerData: adminService.rejectCustomerData,
  createAdmin: adminService.createAdmin,
  getAdminList: adminService.getAdminList,
  deleteAdmin: adminService.deleteAdmin,
};


// Cart API operations
export const cartApi = {
  add: cartService.addToCart,
  get: cartService.getCart,
  remove: cartService.removeFromCart,
  clear: cartService.clearCart,
};

// Hold API operations
export const holdApi = {
  add: holdService.addToHold,
  get: holdService.getHoldItems,
};

// Customer enquiries
export const queryApi = {
  create: queryService.createQuery,
  getUserQueries: queryService.getUserQueries,
};

// Admin API
export const adminApi = {
  // Customer data management
  getPendingCustomerData: adminService.getPendingCustomerData,
  approveCustomerData: adminService.approveCustomerData,
  rejectCustomerData: adminService.rejectCustomerData,
  
  // Admin user management
  createAdmin: adminService.createAdmin,
  getAdminList: adminService.getAdminList,
  deleteAdmin: adminService.deleteAdmin,
  getAllUsers: userService.getAllUsers, 
  
  // Hold management
  getAllHolds: adminService.getAllHolds,
  approveHold: adminService.approveHold,
  rejectHold: adminService.rejectHold,
  
  // Query management
  getAllQueries: adminService.getAllQueries,
  replyToQuery: adminService.replyToQuery,
  
  // Cart management
  getAllCarts: adminService.getAllCarts,
};

// Blog API
export const blogApi = {
  getAll: blogService.getAllBlogs,
  getById: blogService.getBlogById,
  create: blogService.createBlog,
  update: blogService.updateBlog,
  delete: blogService.deleteBlog,
};

// Form API, Form submission handling
export const formApi = {
  submitSellDiamond: formService.submitSellDiamondForm,
  getGroupedSubmissions: formService.getGroupedSubmissions,
  updateStatus: formService.updateSubmissionStatus,
};

// Inventory API, Inventory and supplier management
export const inventoryApi = {
  getAllDiamonds: inventoryService.getAllInventoryDiamonds,
  search: inventoryService.searchInventoryDiamonds,
  searchDiamonds: inventoryService.searchInventoryDiamonds, 
  updateSupplierVisibility: inventoryService.updateSupplierVisibility,
  getSuppliers: inventoryService.getSuppliers,
  applySupplierFilters: inventoryService.applySupplierFilters,
  getSupplierFilters: inventoryService.getSupplierFilters,
};



import { apiClient, API_URL, UNAUTHORIZED_EVENT } from "../services/api";

// Re-export commonly used items
export { apiClient, API_URL, UNAUTHORIZED_EVENT };

export default apiClient;
