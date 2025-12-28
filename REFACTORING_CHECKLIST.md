# ✅ FOLDER STRUCTURE REFACTORING - EXECUTION CHECKLIST

## 📋 How to Use This Checklist

1. Check off items as you complete them: `- [ ]` → `- [x]`
2. Commit after each major section
3. Test build after each phase
4. If something breaks, you can revert to last commit

---

## 🚀 PHASE 1: PREPARATION

### Backup & Documentation
- [ ] Create new branch: `git checkout -b refactor/folder-structure-optimization`
- [ ] Commit current state: `git add . && git commit -m "Pre-refactoring checkpoint"`
- [ ] Run initial build to ensure starting point is clean: `npm run build`
- [ ] Note any existing warnings/errors (to distinguish from new ones)

**Estimated Time**: 30 minutes  
**Commit Message**: `chore: pre-refactoring checkpoint`

---

## 📦 PHASE 2: TYPE SYSTEM REORGANIZATION

### 2.1 Rename Main Type File
- [ ] Rename: `src/types/Diamondtable.ts` → `src/types/diamond.types.ts`
- [ ] Update imports in all files referencing `@/types/Diamondtable`

### 2.2 Move Type Files from Services
- [ ] Move: `src/services/api/types/api.types.ts` → `src/types/api.types.ts`
- [ ] Move: `src/services/api/types/user.types.ts` → `src/types/user.types.ts`
- [ ] Move: `src/services/api/types/diamond.types.ts` → `src/types/diamond.types.ts` (if exists)
- [ ] Delete: `src/services/api/types/` folder (if empty)

### 2.3 Create Central Type Exports
- [ ] Create: `src/types/index.ts` with all type exports

### 2.4 Update All Type Imports
Files to update (~50 files):
- [ ] All files importing from `@/types/Diamondtable`
- [ ] All files importing from `@/services/api/types/`
- [ ] Update service files to use new type paths

### 2.5 Verify
- [ ] Run: `npm run build`
- [ ] Fix any type errors
- [ ] Run: `npm run lint`
- [ ] Commit: `git add . && git commit -m "refactor: reorganize type system"`

**Estimated Time**: 1-2 hours  
**Commit Message**: `refactor: reorganize type system - centralize all types in types/ folder`

---

## 🎣 PHASE 3: HOOKS REORGANIZATION

### 3.1 Create Hook Folders
- [ ] Create: `src/hooks/diamond/` folder
- [ ] Create: `src/hooks/inventory/` folder

### 3.2 Move Diamond Hooks
- [ ] Move: `src/hooks/useDiamondData.ts` → `src/hooks/diamond/useDiamondData.ts`
- [ ] Move: `src/hooks/useDiamondFilters.ts` → `src/hooks/diamond/useDiamondFilters.ts`
- [ ] Move: `src/hooks/useDiamondPagination.ts` → `src/hooks/diamond/useDiamondPagination.ts`
- [ ] Move: `src/hooks/useDiamondSelection.ts` → `src/hooks/diamond/useDiamondSelection.ts`

### 3.3 Move Inventory Hooks
- [ ] Move: `src/hooks/useInventoryData.ts` → `src/hooks/inventory/useInventoryData.ts`
- [ ] Move: `src/hooks/useInventoryFilters.ts` → `src/hooks/inventory/useInventoryFilters.ts`

### 3.4 Create Index Files
- [ ] Create: `src/hooks/diamond/index.ts` with exports
- [ ] Create: `src/hooks/inventory/index.ts` with exports
- [ ] Create: `src/hooks/index.ts` with all hook exports

### 3.5 Update Hook Imports
Files to update (~10 files):
- [ ] `src/components/DiamondStockTable.tsx`
- [ ] `src/components/DiamondGridView.tsx`
- [ ] `src/components/DiamondStockTableWithFilter.tsx`
- [ ] `src/components/InventoryDiamondTable.tsx`
- [ ] `src/components/LimitedEdition/DiamondStockTableLimited.tsx`
- [ ] `src/components/LimitedEdition/DiamondStockTableWithFilterlimited.tsx`
- [ ] Any other files using these hooks

### 3.6 Verify
- [ ] Run: `npm run build`
- [ ] Fix any import errors
- [ ] Run: `npm run lint`
- [ ] Commit: `git add . && git commit -m "refactor: organize hooks by feature domain"`

**Estimated Time**: 1 hour  
**Commit Message**: `refactor: organize hooks by feature domain - group diamond and inventory hooks`

---

## 📁 PHASE 4: CREATE COMPONENT FOLDERS

### 4.1 Create Top-Level Component Folders
- [ ] Create: `src/components/Layout/`
- [ ] Create: `src/components/Auth/`
- [ ] Create: `src/components/Modals/`
- [ ] Create: `src/components/Common/`
- [ ] Create: `src/components/Inventory/`
- [ ] Create: `src/components/Customer/`

### 4.2 Create Diamond Subfolders
- [ ] Create: `src/components/Diamond/Grid/`
- [ ] Create: `src/components/Diamond/Filters/`

### 4.3 Rename Existing Folders (Preparation)
- [ ] Note: Will rename `cart/` → `Cart/` in Phase 5
- [ ] Note: Will rename `ui/` → `UI/` in Phase 5
- [ ] Note: Will rename `pages/` → `Sections/` in Phase 5
- [ ] Note: Will rename `Diamond/shared/` → `Diamond/Shared/` in Phase 5

### 4.4 Verify
- [ ] Folders created successfully
- [ ] No files moved yet (just folder creation)
- [ ] Commit: `git add . && git commit -m "refactor: create new component folder structure"`

**Estimated Time**: 30 minutes  
**Commit Message**: `refactor: create new component folder structure`

---

## 🚚 PHASE 5: MOVE & RENAME COMPONENTS (CRITICAL PHASE)

### 5.1 Layout Components
- [ ] Move: `src/components/pages/Header.tsx` → `src/components/Layout/Header.tsx`
- [ ] Move: `src/components/Footer.tsx` → `src/components/Layout/Footer.tsx`
- [ ] Move: `src/components/HeaderFooterWrapper.tsx` → `src/components/Layout/HeaderFooterWrapper.tsx`
- [ ] Create: `src/components/Layout/index.ts`
- [ ] Update imports in ~15 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: move layout components"`

### 5.2 Auth Components
- [ ] Move: `src/components/ProtectedRoute.tsx` → `src/components/Auth/ProtectedRoute.tsx`
- [ ] Extract: Login form from `src/components/pages/login/page.tsx` → `src/components/Auth/LoginForm.tsx`
- [ ] Extract: Register form from `src/components/pages/Register/page.tsx` → `src/components/Auth/RegisterForm.tsx`
- [ ] Extract: OTP form from `src/components/pages/otpverfication/page.tsx` → `src/components/Auth/OtpVerificationForm.tsx`
- [ ] Create: `src/components/Auth/index.ts`
- [ ] Update imports in ~20 files
- [ ] Update `src/app/login/page.tsx` to use new LoginForm
- [ ] Update `src/app/register/page.tsx` to use new RegisterForm
- [ ] Update `src/app/verify-otp/page.tsx` to use new OtpVerificationForm
- [ ] Delete: `src/components/pages/login/`, `pages/Register/`, `pages/otpverfication/` folders
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: extract and organize auth components"`

### 5.3 Diamond Components - Part 1 (Filters)
- [ ] Move: `src/components/Filters/CaratFilter.tsx` → `src/components/Diamond/Filters/CaratFilter.tsx`
- [ ] Move: `src/components/Filters/ShapeFilter.tsx` → `src/components/Diamond/Filters/ShapeFilter.tsx`
- [ ] Move: `src/components/Filters/ColorFilter.tsx` → `src/components/Diamond/Filters/ColorFilter.tsx`
- [ ] Move: `src/components/Filters/ClarityFilter.tsx` → `src/components/Diamond/Filters/ClarityFilter.tsx`
- [ ] Move: `src/components/Filters/FluorescenceFilter.tsx` → `src/components/Diamond/Filters/FluorescenceFilter.tsx`
- [ ] Move: `src/components/Filters/InclusionFilter.tsx` → `src/components/Diamond/Filters/InclusionFilter.tsx`
- [ ] Move: `src/components/Filters/MeasurementFilter.tsx` → `src/components/Diamond/Filters/MeasurementFilter.tsx`
- [ ] Move: `src/components/Filters/KeyToSymbolFilter.tsx` → `src/components/Diamond/Filters/KeyToSymbolFilter.tsx`
- [ ] Move: `src/components/Filters/PriceAndLocationFilter.tsx` → `src/components/Diamond/Filters/PriceAndLocationFilter.tsx`
- [ ] Move: `src/components/Filters/AdvancedFilters.tsx` → `src/components/Diamond/Filters/AdvancedFilters.tsx`
- [ ] Update: `src/components/Diamond/Filters/index.ts`
- [ ] Delete: `src/components/Filters/` folder
- [ ] Update imports in `DiamondStockTableWithFilter.tsx`
- [ ] Update imports in `InventoryDiamondTable.tsx`
- [ ] Update imports in `ConfigureAPIModal.tsx`
- [ ] Update type imports in `src/types/diamond.types.ts`
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: move diamond filters to Diamond/Filters"`

### 5.4 Diamond Components - Part 2 (Main Components)
- [ ] Move: `src/components/DiamondGridView.tsx` → `src/components/Diamond/Grid/DiamondGridView.tsx`
- [ ] Create: `src/components/Diamond/Grid/index.ts`
- [ ] Move: `src/components/DiamondStockTable.tsx` → `src/components/Diamond/DiamondStockTable.tsx`
- [ ] Move: `src/components/DiamondStockTableWithFilter.tsx` → `src/components/Diamond/DiamondStockTableWithFilter.tsx`
- [ ] Move: `src/components/DiamondDetailView.tsx` → `src/components/Diamond/DiamondDetailView.tsx`
- [ ] Move: `src/components/DiamondComparisonPage.tsx` → `src/components/Diamond/DiamondComparisonPage.tsx`
- [ ] Move: `src/components/Diamond/DiamondMediaViewer.tsx` (already in Diamond/)
- [ ] Rename: `src/components/Diamond/shared/` → `src/components/Diamond/Shared/`
- [ ] Update: `src/components/Diamond/Shared/index.ts`
- [ ] Create: `src/components/Diamond/index.ts`
- [ ] Update imports in ~30 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: consolidate all diamond components"`

### 5.5 Limited Edition Components
- [ ] Rename: `DiamondStockTableWithFilterlimited.tsx` → `DiamondStockTableWithFilterLimited.tsx`
- [ ] Rename: `limitedEditionproduct.tsx` → `LimitedEditionProduct.tsx`
- [ ] Update: `src/components/LimitedEdition/index.ts`
- [ ] Update imports in ~5 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: rename limited edition components for consistency"`

### 5.6 Inventory Components
- [ ] Move: `src/components/InventoryDiamondTable.tsx` → `src/components/Inventory/InventoryDiamondTable.tsx`
- [ ] Create: `src/components/Inventory/index.ts`
- [ ] Update imports in ~3 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: organize inventory components"`

### 5.7 Dashboard & Customer Components
- [ ] Rename: `src/components/Dashboard/page.tsx` → `src/components/Dashboard/DashboardPage.tsx`
- [ ] Update: `src/components/Dashboard/index.ts`
- [ ] Update: `src/app/dashboard/page.tsx` import
- [ ] Move: `src/components/CustomerDetails/page.tsx` → `src/components/Customer/CustomerDetailsPage.tsx`
- [ ] Delete: `src/components/CustomerDetails/` folder
- [ ] Create: `src/components/Customer/index.ts`
- [ ] Update: `src/app/customer-details/page.tsx` import
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: organize dashboard and customer components"`

### 5.8 Cart Components
- [ ] Rename folder: `src/components/cart/` → `src/components/Cart/`
- [ ] Create: `src/components/Cart/index.ts`
- [ ] Update imports in ~10 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: rename cart folder for consistency"`

### 5.9 Section Components - Part 1 (Rename Main Folder)
- [ ] Rename: `src/components/pages/` → `src/components/Sections/`
- [ ] Update any imports referencing `components/pages`
- [ ] Test build: `npm run build`

### 5.10 Section Components - Part 2 (Home)
- [ ] Rename: `src/components/Sections/homecomponents/` → `src/components/Sections/Home/`
- [ ] Move: `src/components/Sections/HeroSection.tsx` → `src/components/Sections/Home/HeroSection.tsx`
- [ ] Rename: `src/components/Sections/Home/experience.tsx` → `Experience.tsx`
- [ ] Rename: `src/components/Sections/Home/homeContent.tsx` → `HomeContent.tsx`
- [ ] Create: `src/components/Sections/Home/index.ts`
- [ ] Update imports in home page
- [ ] Test build: `npm run build`

### 5.11 Section Components - Part 3 (About Us)
- [ ] Rename: `src/components/Sections/aboutus/` → `src/components/Sections/AboutUs/`
- [ ] Rename: `Bannersection.tsx` → `BannerSection.tsx`
- [ ] Rename: `Herosection.tsx` → `HeroSection.tsx`
- [ ] Create: `src/components/Sections/AboutUs/index.ts`
- [ ] Update imports in about page
- [ ] Test build: `npm run build`

### 5.12 Section Components - Part 4 (Contact)
- [ ] Rename: `src/components/Sections/contactus/` → `src/components/Sections/Contact/`
- [ ] Rename: `Bannersection.tsx` → `BannerSection.tsx`
- [ ] Rename: `Herosection.tsx` → `HeroSection.tsx`
- [ ] Create: `src/components/Sections/Contact/index.ts`
- [ ] Update imports in contact page
- [ ] Test build: `npm run build`

### 5.13 Section Components - Part 5 (Diamond Source)
- [ ] Rename: `src/components/Sections/diamond-source/` → `src/components/Sections/DiamondSource/`
- [ ] Rename: `Bannersection.tsx` → `BannerSection.tsx`
- [ ] Rename: `Herosection.tsx` → `HeroSection.tsx`
- [ ] Create: `src/components/Sections/DiamondSource/index.ts`
- [ ] Update imports in diamond-source page
- [ ] Test build: `npm run build`

### 5.14 Section Components - Part 6 (Diamond Knowledge)
- [ ] Rename: `src/components/Sections/diamondknowledge/` → `src/components/Sections/DiamondKnowledge/`
- [ ] Rename: `Bannersection.tsx` → `BannerSection.tsx`
- [ ] Rename: `Diamondcuts.tsx` → `DiamondCuts.tsx`
- [ ] Rename: `DiamondShapecuts.tsx` → `DiamondShapeCuts.tsx`
- [ ] Rename: `Lab-GrownDiamonds.tsx` → `LabGrownDiamonds.tsx`
- [ ] Create: `src/components/Sections/DiamondKnowledge/index.ts`
- [ ] Update imports in diamond-knowledge page
- [ ] Test build: `npm run build`

### 5.15 Section Components - Part 7 (Secure Source)
- [ ] Rename: `src/components/Sections/securesource/` → `src/components/Sections/SecureSource/`
- [ ] Rename: `Bannersection.tsx` → `BannerSection.tsx`
- [ ] Rename: `Herosection.tsx` → `HeroSection.tsx`
- [ ] Create: `src/components/Sections/SecureSource/index.ts`
- [ ] Update imports in secure-to-source page
- [ ] Test build: `npm run build`

### 5.16 Section Components - Part 8 (Sell Upgrade Donate)
- [ ] Rename: `src/components/Sections/sud/` → `src/components/Sections/SellUpgradeDonate/`
- [ ] Rename: `Bannersection.tsx` → `BannerSection.tsx`
- [ ] Rename: `Herosection.tsx` → `HeroSection.tsx`
- [ ] Rename: `SellDiamondform.tsx` → `SellDiamondForm.tsx`
- [ ] Create: `src/components/Sections/SellUpgradeDonate/index.ts`
- [ ] Update imports in sud page
- [ ] Test build: `npm run build`

### 5.17 Section Components - Commit
- [ ] Commit: `git add . && git commit -m "refactor: reorganize and rename section components"`

### 5.18 Modal Components
- [ ] Move: `src/components/ConfigureAPIModal.tsx` → `src/components/Modals/ConfigureAPIModal.tsx`
- [ ] Move: `src/components/SupplierManagementModal.tsx` → `src/components/Modals/SupplierManagementModal.tsx`
- [ ] Create: `src/components/Modals/index.ts`
- [ ] Update imports in ~10 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: organize modal components"`

### 5.19 Common Components
- [ ] Move: `src/components/SearchBar.tsx` → `src/components/Common/SearchBar.tsx`
- [ ] Move: `src/components/CompareButton.tsx` → `src/components/Common/CompareButton.tsx`
- [ ] Move: `src/components/EmailButton.tsx` → `src/components/Common/EmailButton.tsx`
- [ ] Move: `src/components/shared/AnimatedContainer.tsx` → `src/components/Common/AnimatedContainer.tsx`
- [ ] Rename: `src/components/instaSection.tsx` → `src/components/Common/InstagramSection.tsx`
- [ ] Delete: `src/components/shared/` folder
- [ ] Create: `src/components/Common/index.ts`
- [ ] Update imports in ~20 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: organize common components"`

### 5.20 UI Components
- [ ] Rename: `src/components/ui/` → `src/components/UI/`
- [ ] Rename: `src/components/UI/button.tsx` → `Button.tsx`
- [ ] Update: `src/components/UI/index.ts`
- [ ] Update imports in ~15 files
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: rename UI components for consistency"`

**Estimated Time**: 4-6 hours  
**Final Commit Message**: `refactor: complete component reorganization and naming standardization`

---

## 🌐 PHASE 6: APP ROUTER REORGANIZATION

### 6.1 Move globals.css
- [ ] Move: `src/components/globals.css` → `src/app/globals.css`
- [ ] Update: `src/app/layout.tsx` import
- [ ] Test build: `npm run build`
- [ ] Commit: `git add . && git commit -m "refactor: move globals.css to app folder"`

### 6.2 Create Route Groups (Optional)
**Decision needed**: Do you want to use route groups?
- [ ] **YES** - Continue with 6.3-6.6
- [ ] **NO** - Skip to 6.7

### 6.3 Auth Route Group (if YES)
- [ ] Create: `src/app/(auth)/` folder
- [ ] Move: `src/app/login/` → `src/app/(auth)/login/`
- [ ] Move: `src/app/register/` → `src/app/(auth)/register/`
- [ ] Move: `src/app/verify-otp/` → `src/app/(auth)/verify-otp/`
- [ ] Move: `src/app/forgot-password/` → `src/app/(auth)/forgot-password/`
- [ ] Test routes work
- [ ] Test build: `npm run build`

### 6.4 Public Route Group (if YES)
- [ ] Create: `src/app/(public)/` folder
- [ ] Move: `src/app/aboutUs/` → `src/app/(public)/about-us/`
- [ ] Move: `src/app/contact/` → `src/app/(public)/contact/`
- [ ] Move: `src/app/diamond-source/` → `src/app/(public)/diamond-source/`
- [ ] Move: `src/app/diamondKnowledge/` → `src/app/(public)/diamond-knowledge/`
- [ ] Move: `src/app/secure-to-source/` → `src/app/(public)/secure-to-source/`
- [ ] Move: `src/app/sud/` → `src/app/(public)/sell-upgrade-donate/`
- [ ] Move: `src/app/blogs/` → `src/app/(public)/blogs/`
- [ ] Test routes work
- [ ] Test build: `npm run build`

### 6.5 Protected Route Group (if YES)
- [ ] Create: `src/app/(protected)/` folder
- [ ] Move: `src/app/dashboard/` → `src/app/(protected)/dashboard/`
- [ ] Move: `src/app/inventory/` → `src/app/(protected)/inventory/`
- [ ] Move: `src/app/inventory-management/` → `src/app/(protected)/inventory-management/`
- [ ] Move: `src/app/limitedEdition/` → `src/app/(protected)/limited-edition/`
- [ ] Move: `src/app/cart/` → `src/app/(protected)/cart/`
- [ ] Move: `src/app/holdstone/` → `src/app/(protected)/holdstone/`
- [ ] Move: `src/app/customer-details/` → `src/app/(protected)/customer-details/`
- [ ] Move: `src/app/customer-management/` → `src/app/(protected)/customer-management/`
- [ ] Move: `src/app/buy-form/` → `src/app/(protected)/buy-form/`
- [ ] Test routes work
- [ ] Test build: `npm run build`

### 6.6 Admin Route Group (if YES)
- [ ] Create: `src/app/(admin)/` folder
- [ ] Move: `src/app/create-admin/` → `src/app/(admin)/create-admin/`
- [ ] Move: `src/app/enquiry/` → `src/app/(admin)/enquiry/`
- [ ] Move: `src/app/offer-enquiry/` → `src/app/(admin)/offer-enquiry/`
- [ ] Test routes work
- [ ] Test build: `npm run build`

### 6.7 Rename App Folders (URL Changes!)
**Decision needed**: Do you want to change URLs?
- [ ] **YES** - Continue with renames
- [ ] **NO** - Skip this section

If YES:
- [ ] Rename: `src/app/limitedEdition/` → `src/app/limited-edition/` (or in protected group)
- [ ] Rename: `src/app/diamondKnowledge/` → `src/app/diamond-knowledge/` (or in public group)
- [ ] Rename: `src/app/sud/` → `src/app/sell-upgrade-donate/` (or in public group)
- [ ] Rename: `src/app/aboutUs/` → `src/app/about-us/` (or in public group)
- [ ] Update all navigation links in components
- [ ] Add redirects in `next.config.js` for old URLs
- [ ] Test all routes work
- [ ] Test build: `npm run build`

### 6.8 Update Navigation Links
- [ ] Find all `href="/limitedEdition"` → update to new path
- [ ] Find all `href="/diamondKnowledge"` → update to new path
- [ ] Find all `href="/sud"` → update to new path
- [ ] Find all `href="/aboutUs"` → update to new path
- [ ] Test all links work
- [ ] Test build: `npm run build`

### 6.9 Verify & Commit
- [ ] Test all routes manually
- [ ] Test all navigation links
- [ ] Run: `npm run build`
- [ ] Run: `npm run lint`
- [ ] Commit: `git add . && git commit -m "refactor: reorganize app router with route groups"`

**Estimated Time**: 2-3 hours  
**Commit Message**: `refactor: reorganize app router structure and standardize route naming`

---

## 🧹 PHASE 7: CLEANUP & OPTIMIZATION

### 7.1 Delete Empty Folders
- [ ] Check and delete: `src/components/Filters/` (if empty)
- [ ] Check and delete: `src/components/pages/` (if empty)
- [ ] Check and delete: `src/components/shared/` (if empty)
- [ ] Check and delete: `src/components/cart/` (old lowercase)
- [ ] Check and delete: `src/components/ui/` (old lowercase)
- [ ] Check and delete: `src/components/CustomerDetails/` (if empty)
- [ ] Check and delete: `src/services/api/types/` (if empty)

### 7.2 Create Missing Index Files
- [ ] Verify: `src/types/index.ts` exports all types
- [ ] Verify: `src/hooks/index.ts` exports all hooks
- [ ] Verify: `src/hooks/diamond/index.ts` exports all diamond hooks
- [ ] Verify: `src/hooks/inventory/index.ts` exports all inventory hooks
- [ ] Verify: `src/components/Diamond/index.ts` exports main components
- [ ] Verify: `src/components/Diamond/Filters/index.ts` exports all filters
- [ ] Verify: `src/components/Diamond/Grid/index.ts` exports grid components
- [ ] Verify: `src/components/Diamond/Shared/index.ts` exports shared components
- [ ] Verify: `src/components/LimitedEdition/index.ts` exports LE components
- [ ] Verify: `src/components/Inventory/index.ts` exports inventory components
- [ ] Verify: `src/components/Dashboard/index.ts` exports dashboard
- [ ] Verify: `src/components/Customer/index.ts` exports customer components
- [ ] Verify: `src/components/Cart/index.ts` exports cart components
- [ ] Verify: `src/components/BuyForm/index.ts` exports buy form
- [ ] Verify: `src/components/Layout/index.ts` exports layout components
- [ ] Verify: `src/components/Auth/index.ts` exports auth components
- [ ] Verify: `src/components/Modals/index.ts` exports modals
- [ ] Verify: `src/components/Common/index.ts` exports common components
- [ ] Verify: `src/components/UI/index.ts` exports UI components
- [ ] Create index files for all Section subfolders

### 7.3 Optimize Imports
- [ ] Replace relative imports with absolute `@/` imports where beneficial
- [ ] Use barrel exports from index.ts files where appropriate
- [ ] Remove any unused imports (check with linter)
- [ ] Standardize import order (types, react, next, internal, styles)

### 7.4 Verify & Commit
- [ ] Run: `npm run build`
- [ ] Run: `npm run lint`
- [ ] Fix any remaining warnings
- [ ] Commit: `git add . && git commit -m "refactor: cleanup and optimize imports"`

**Estimated Time**: 1-2 hours  
**Commit Message**: `refactor: cleanup empty folders and optimize imports`

---

## ✅ PHASE 8: TESTING & VERIFICATION

### 8.1 Build Verification
- [ ] Run: `npm run build`
- [ ] Verify: Zero build errors
- [ ] Note: Any warnings (compare with initial state)
- [ ] Check: Build output sizes are reasonable

### 8.2 Linting
- [ ] Run: `npm run lint`
- [ ] Fix: Any linting errors related to refactoring
- [ ] Verify: No new warnings introduced

### 8.3 Type Checking
- [ ] Run: `npx tsc --noEmit` (if available)
- [ ] Fix: Any type errors
- [ ] Verify: All types resolve correctly

### 8.4 Manual Testing - Routes
- [ ] Test: Home page loads
- [ ] Test: All public routes work (about, contact, etc.)
- [ ] Test: Login page works
- [ ] Test: Register page works
- [ ] Test: OTP verification works
- [ ] Test: Dashboard loads (after login)
- [ ] Test: Inventory page works
- [ ] Test: Limited edition page works
- [ ] Test: Cart page works
- [ ] Test: All other protected routes work

### 8.5 Manual Testing - Features
- [ ] Test: Diamond table displays and paginates
- [ ] Test: Diamond grid view works
- [ ] Test: Filters work correctly
- [ ] Test: Diamond detail view opens
- [ ] Test: Add to cart works
- [ ] Test: Hold button works
- [ ] Test: Compare diamonds works
- [ ] Test: Search works
- [ ] Test: Limited edition table works
- [ ] Test: Inventory management works

### 8.6 Manual Testing - Navigation
- [ ] Test: Header navigation links work
- [ ] Test: Footer links work
- [ ] Test: Breadcrumbs work (if any)
- [ ] Test: Back buttons work
- [ ] Test: Protected route redirects work

### 8.7 Browser Console Check
- [ ] Open browser console
- [ ] Navigate through app
- [ ] Verify: No console errors
- [ ] Verify: No 404s for assets
- [ ] Verify: No broken imports

### 8.8 Documentation
- [ ] Update: README.md with new structure
- [ ] Create: ARCHITECTURE.md (if needed)
- [ ] Update: Any developer documentation
- [ ] Document: New import patterns
- [ ] Document: Folder structure decisions

### 8.9 Final Commit
- [ ] Commit any documentation updates
- [ ] Create final commit: `git add . && git commit -m "docs: update documentation for new structure"`
- [ ] Tag release: `git tag -a v2.0.0-refactored -m "Complete folder structure refactoring"`

### 8.10 Code Review
- [ ] Push branch: `git push origin refactor/folder-structure-optimization`
- [ ] Create pull request
- [ ] Request code review from team
- [ ] Address review comments
- [ ] Get approval

### 8.11 Merge
- [ ] Merge to main branch
- [ ] Delete refactoring branch (after merge)
- [ ] Notify team of changes
- [ ] Update team on new structure

**Estimated Time**: 2-3 hours  
**Final Commit Message**: `refactor: complete folder structure optimization - all tests passing`

---

## 📊 COMPLETION CHECKLIST

### Success Criteria
- [ ] ✅ Zero build errors
- [ ] ✅ Zero linter errors (related to refactoring)
- [ ] ✅ All routes working
- [ ] ✅ All features functional
- [ ] ✅ 100% consistent naming (PascalCase for components)
- [ ] ✅ Clear folder structure
- [ ] ✅ Easy to find components
- [ ] ✅ Documentation updated
- [ ] ✅ Team notified
- [ ] ✅ Code review approved

### Metrics
- [ ] Files renamed: ___/16
- [ ] Folders renamed: ___/15
- [ ] Files moved: ___/50+
- [ ] Import statements updated: ___/150-200
- [ ] Index files created: ___/20+
- [ ] Time spent: ___ hours (target: 12-18 hours)

---

## 🚨 TROUBLESHOOTING

### If Build Fails
1. Check the error message carefully
2. Look for import path issues
3. Verify file names match imports (case-sensitive!)
4. Check for circular dependencies
5. Revert last commit if needed: `git reset --hard HEAD~1`

### If Routes Don't Work
1. Check folder names in `app/` directory
2. Verify `page.tsx` files are in correct locations
3. Check for typos in folder names
4. Clear Next.js cache: `rm -rf .next`
5. Restart dev server

### If Imports Break
1. Use Find & Replace to fix bulk imports
2. Check for case sensitivity issues
3. Verify index.ts exports are correct
4. Use IDE's "Find all references" feature
5. Check for circular dependencies

### If Tests Fail
1. Update test imports
2. Update test file paths
3. Check for hardcoded paths in tests
4. Update test snapshots if needed

---

## 📞 QUESTIONS DURING EXECUTION

If you encounter any of these, stop and decide:

1. ❓ Should we extract auth forms or keep them in page.tsx files?
   - **Recommendation**: Extract for better reusability
   
2. ❓ Should we use route groups in app/?
   - **Recommendation**: Yes, for better organization
   
3. ❓ Should we change URLs (rename app folders)?
   - **Recommendation**: Yes, but add redirects for old URLs
   
4. ❓ Should we create index.ts in every folder?
   - **Recommendation**: Yes, for cleaner imports
   
5. ❓ Should we rename 'sud' to something descriptive?
   - **Recommendation**: Yes, to 'sell-upgrade-donate'

---

## 🎉 COMPLETION

Congratulations! You've successfully refactored the entire folder structure!

### What Changed
- ✅ 16 files renamed for consistency
- ✅ 15 folders renamed for clarity
- ✅ 50+ files moved to better locations
- ✅ 150-200 imports updated
- ✅ 20+ index files created
- ✅ Complete feature grouping
- ✅ Consistent naming conventions
- ✅ Clear folder structure

### Benefits Achieved
- 🎯 Easier to find components
- 🎯 Clear feature boundaries
- 🎯 Better code organization
- 🎯 Improved maintainability
- 🎯 Better developer experience
- 🎯 Scalable structure

### Next Steps
1. Monitor for any issues in production
2. Update team on new structure
3. Update onboarding documentation
4. Consider extracting more components
5. Plan Phase 3 improvements

---

**Refactoring Complete!** 🚀  
**Date Completed**: ___________  
**Total Time**: ___ hours  
**Team Members**: ___________  
**Status**: ✅ SUCCESS


