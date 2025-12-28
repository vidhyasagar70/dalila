# 🏗️ COMPLETE FOLDER STRUCTURE REFACTORING PLAN

## 📋 Executive Summary

This document outlines a comprehensive refactoring plan to reorganize the application's folder structure, rename files for consistency, and improve overall code organization. The plan addresses naming inconsistencies, misplaced files, and structural improvements.

---

## 🎯 Current Issues Identified

### 1. **Naming Inconsistencies**
- Mixed case conventions: `DiamondStockTableWithFilterlimited.tsx` (lowercase 'limited')
- Inconsistent naming: `limitedEditionproduct.tsx` (lowercase start)
- Unclear names: `instaSection.tsx`, `sud` folder
- Mixed conventions: `diamondKnowledge` vs `diamond-source`

### 2. **Structural Problems**
- **Page components in wrong locations**: `Dashboard/page.tsx`, `CustomerDetails/page.tsx` in `components/` instead of being proper components
- **Duplicate page logic**: `components/pages/login/page.tsx` vs `app/login/page.tsx`
- **Misplaced globals.css**: In `components/` folder instead of `app/`
- **Unclear folder purposes**: `pages/` folder inside `components/` contains sections, not pages

### 3. **Organization Issues**
- Diamond-related components scattered across root `components/`
- No clear separation between feature modules
- Cart components in lowercase folder `cart/`
- Mixed capitalization in folder names

---

## 🎨 PROPOSED NEW STRUCTURE

```
src/
├── app/                                    # Next.js App Router (Routes only)
│   ├── (auth)/                            # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-otp/
│   │   └── forgot-password/
│   ├── (public)/                          # Public routes
│   │   ├── about-us/
│   │   ├── contact/
│   │   ├── diamond-source/
│   │   ├── diamond-knowledge/
│   │   ├── secure-to-source/
│   │   ├── sell-upgrade-donate/          # Renamed from 'sud'
│   │   └── blogs/
│   ├── (protected)/                       # Protected routes
│   │   ├── dashboard/
│   │   ├── inventory/
│   │   ├── inventory-management/
│   │   ├── limited-edition/              # Renamed from 'limitedEdition'
│   │   ├── cart/
│   │   ├── holdstone/
│   │   ├── customer-details/
│   │   ├── customer-management/
│   │   └── buy-form/
│   ├── (admin)/                           # Admin-only routes
│   │   ├── create-admin/
│   │   ├── enquiry/
│   │   └── offer-enquiry/
│   ├── member/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css                        # MOVED from components/
│   └── globals.phoneinput2.css
│
├── components/                             # Reusable Components
│   ├── Layout/                            # Layout components
│   │   ├── Header.tsx                     # MOVED from pages/Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeaderFooterWrapper.tsx
│   │   └── index.ts
│   │
│   ├── Auth/                              # Authentication components
│   │   ├── ProtectedRoute.tsx
│   │   ├── LoginForm.tsx                  # EXTRACTED from pages/login
│   │   ├── RegisterForm.tsx               # EXTRACTED from pages/Register
│   │   └── OtpVerificationForm.tsx        # EXTRACTED from pages/otpverfication
│   │
│   ├── Diamond/                           # Diamond feature module
│   │   ├── Table/
│   │   │   ├── DiamondTable.tsx
│   │   │   ├── DiamondTableHeader.tsx
│   │   │   ├── DiamondTableRow.tsx
│   │   │   └── index.ts
│   │   ├── Grid/                          # NEW: Grid-specific components
│   │   │   ├── DiamondGridView.tsx        # MOVED from root
│   │   │   └── index.ts
│   │   ├── Filters/                       # MOVED from root Filters/
│   │   │   ├── CaratFilter.tsx
│   │   │   ├── ShapeFilter.tsx
│   │   │   ├── ColorFilter.tsx
│   │   │   ├── ClarityFilter.tsx
│   │   │   ├── FluorescenceFilter.tsx
│   │   │   ├── InclusionFilter.tsx
│   │   │   ├── MeasurementFilter.tsx
│   │   │   ├── KeyToSymbolFilter.tsx
│   │   │   ├── PriceAndLocationFilter.tsx
│   │   │   ├── AdvancedFilters.tsx
│   │   │   └── index.ts
│   │   ├── Shared/                        # Renamed from 'shared'
│   │   │   ├── DiamondTableEmpty.tsx
│   │   │   ├── DiamondTableError.tsx
│   │   │   ├── DiamondTableLoading.tsx
│   │   │   ├── DiamondTablePagination.tsx
│   │   │   └── index.ts
│   │   ├── DiamondStockTable.tsx          # MOVED from root
│   │   ├── DiamondStockTableWithFilter.tsx # MOVED from root
│   │   ├── DiamondDetailView.tsx          # MOVED from root
│   │   ├── DiamondMediaViewer.tsx
│   │   ├── DiamondComparisonPage.tsx      # MOVED from root
│   │   └── index.ts
│   │
│   ├── LimitedEdition/                    # Limited Edition feature
│   │   ├── Filters/
│   │   │   ├── CaratFilterLimited.tsx
│   │   │   ├── ColorFilterLimited.tsx
│   │   │   ├── ClarityFilterLimited.tsx
│   │   │   ├── FluorescenceFilterLimited.tsx
│   │   │   ├── ShapeFilterLimited.tsx
│   │   │   ├── SpecialClarityFilter.tsx
│   │   │   └── index.ts
│   │   ├── DiamondStockTableLimited.tsx
│   │   ├── DiamondStockTableWithFilterLimited.tsx  # RENAMED
│   │   ├── LimitedEditionProduct.tsx      # RENAMED from limitedEditionproduct.tsx
│   │   └── index.ts
│   │
│   ├── Inventory/                         # NEW: Inventory feature module
│   │   ├── InventoryDiamondTable.tsx      # MOVED from root
│   │   └── index.ts
│   │
│   ├── Dashboard/                         # Dashboard feature
│   │   ├── DashboardPage.tsx              # RENAMED from page.tsx
│   │   └── index.ts
│   │
│   ├── Customer/                          # Customer management
│   │   ├── CustomerDetailsPage.tsx        # RENAMED from CustomerDetails/page.tsx
│   │   └── index.ts
│   │
│   ├── Cart/                              # RENAMED from 'cart'
│   │   ├── AddToCartButton.tsx
│   │   ├── HoldButton.tsx
│   │   └── index.ts
│   │
│   ├── BuyForm/
│   │   ├── BuyFormManagement.tsx
│   │   └── index.ts
│   │
│   ├── Sections/                          # RENAMED from 'pages'
│   │   ├── Home/                          # RENAMED from homecomponents
│   │   │   ├── HeroSection.tsx            # MOVED from pages/HeroSection.tsx
│   │   │   ├── AboutDalila.tsx
│   │   │   ├── BookComponent.tsx
│   │   │   ├── Certified.tsx
│   │   │   ├── DiamondShapes.tsx
│   │   │   ├── DiamondSource.tsx
│   │   │   ├── Experience.tsx             # RENAMED from experience.tsx
│   │   │   ├── HomeContent.tsx            # RENAMED from homeContent.tsx
│   │   │   ├── VideoContent.tsx
│   │   │   └── index.ts
│   │   ├── AboutUs/                       # RENAMED from aboutus
│   │   │   ├── BannerSection.tsx          # RENAMED from Bannersection.tsx
│   │   │   ├── HeroSection.tsx            # RENAMED from Herosection.tsx
│   │   │   ├── Legacy.tsx
│   │   │   ├── MileStone.tsx
│   │   │   ├── Showcase.tsx
│   │   │   └── index.ts
│   │   ├── Contact/                       # RENAMED from contactus
│   │   │   ├── BannerSection.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── index.ts
│   │   ├── DiamondSource/                 # RENAMED from diamond-source
│   │   │   ├── Advantage.tsx
│   │   │   ├── BannerSection.tsx
│   │   │   ├── DiamondContact.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Showcase.tsx
│   │   │   └── index.ts
│   │   ├── DiamondKnowledge/              # RENAMED from diamondknowledge
│   │   │   ├── BannerSection.tsx
│   │   │   ├── CaringForDiamond.tsx
│   │   │   ├── DiamondCertification.tsx
│   │   │   ├── DiamondCuts.tsx            # RENAMED from Diamondcuts.tsx
│   │   │   ├── DiamondShapeCuts.tsx       # RENAMED from DiamondShapecuts.tsx
│   │   │   ├── LabGrownDiamonds.tsx       # RENAMED from Lab-GrownDiamonds.tsx
│   │   │   ├── Showcase.tsx
│   │   │   └── index.ts
│   │   ├── SecureSource/                  # RENAMED from securesource
│   │   │   ├── Advantage.tsx
│   │   │   ├── BannerSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SecureContact.tsx
│   │   │   ├── Showcase.tsx
│   │   │   └── index.ts
│   │   └── SellUpgradeDonate/             # RENAMED from sud
│   │       ├── BannerSection.tsx
│   │       ├── FreeEstimateSteps.tsx
│   │       ├── HeroSection.tsx
│   │       ├── SellDiamond.tsx
│   │       ├── SellDiamondForm.tsx        # RENAMED from SellDiamondform.tsx
│   │       └── index.ts
│   │
│   ├── Modals/                            # NEW: Modal components
│   │   ├── ConfigureAPIModal.tsx          # MOVED from root
│   │   ├── SupplierManagementModal.tsx    # MOVED from root
│   │   └── index.ts
│   │
│   ├── Common/                            # RENAMED from 'shared'
│   │   ├── SearchBar.tsx                  # MOVED from root
│   │   ├── CompareButton.tsx              # MOVED from root
│   │   ├── EmailButton.tsx                # MOVED from root
│   │   ├── AnimatedContainer.tsx
│   │   ├── InstagramSection.tsx           # RENAMED from instaSection.tsx
│   │   └── index.ts
│   │
│   └── UI/                                # RENAMED from 'ui'
│       ├── Button.tsx                     # RENAMED from button.tsx
│       ├── Toggle.tsx
│       └── index.ts
│
├── hooks/                                  # Custom React Hooks
│   ├── diamond/                           # NEW: Diamond-specific hooks
│   │   ├── useDiamondData.ts
│   │   ├── useDiamondFilters.ts
│   │   ├── useDiamondPagination.ts
│   │   ├── useDiamondSelection.ts
│   │   └── index.ts
│   ├── inventory/                         # NEW: Inventory-specific hooks
│   │   ├── useInventoryData.ts
│   │   ├── useInventoryFilters.ts
│   │   └── index.ts
│   └── index.ts
│
├── services/                               # API Services (Good structure!)
│   ├── api/
│   │   ├── admin/
│   │   ├── base/
│   │   ├── cart/
│   │   ├── diamond/
│   │   ├── user/
│   │   ├── types/
│   │   └── index.ts
│   └── index.ts
│
├── types/                                  # TypeScript Types
│   ├── diamond.types.ts                   # RENAMED from Diamondtable.ts
│   ├── api.types.ts                       # MOVED from services/api/types/
│   ├── user.types.ts                      # MOVED from services/api/types/
│   └── index.ts
│
├── utils/                                  # Utility Functions
│   ├── formatting/
│   │   ├── currency.ts
│   │   ├── date.ts
│   │   ├── percentage.ts
│   │   └── index.ts
│   ├── helpers/
│   │   ├── tableUtils.ts
│   │   └── index.ts
│   └── index.ts
│
└── lib/                                    # Library configurations
    ├── api.ts
    ├── utils.ts
    └── index.ts
```

---

## 📝 DETAILED REFACTORING STEPS

### **PHASE 1: Preparation (Safety First)**
**Goal**: Ensure we can safely refactor without breaking the build

#### Step 1.1: Create Backup Branch
```bash
git checkout -b refactor/folder-structure-optimization
git add .
git commit -m "Pre-refactoring checkpoint"
```

#### Step 1.2: Document Current Imports
- Run grep to find all import statements
- Create import map for critical files

---

### **PHASE 2: Type System Reorganization**
**Goal**: Fix type definitions first (foundation)

#### Step 2.1: Reorganize Types Folder
```
Actions:
1. Rename: src/types/Diamondtable.ts → src/types/diamond.types.ts
2. Move: src/services/api/types/*.ts → src/types/
3. Create: src/types/index.ts (central export)
4. Update: All imports across the application
```

**Files to Update:**
- All files importing from `@/types/Diamondtable`
- All files importing from `@/services/api/types/`

**Estimated Impact**: ~50 files

---

### **PHASE 3: Hooks Reorganization**
**Goal**: Group hooks by feature domain

#### Step 3.1: Create Hook Subfolders
```
Actions:
1. Create: src/hooks/diamond/ folder
2. Move: useDiamondData.ts, useDiamondFilters.ts, useDiamondPagination.ts, useDiamondSelection.ts
3. Create: src/hooks/diamond/index.ts
4. Create: src/hooks/inventory/ folder
5. Move: useInventoryData.ts, useInventoryFilters.ts
6. Create: src/hooks/inventory/index.ts
7. Create: src/hooks/index.ts (central export)
8. Update: All hook imports
```

**Files to Update:**
- DiamondStockTable.tsx
- DiamondGridView.tsx
- InventoryDiamondTable.tsx
- DiamondStockTableLimited.tsx
- DiamondStockTableWithFilter.tsx

**Estimated Impact**: ~10 files

---

### **PHASE 4: Component Structure - Level 1 (Folders)**
**Goal**: Create new folder structure without moving files yet

#### Step 4.1: Create New Component Folders
```
Actions:
1. Create all new folders:
   - components/Layout/
   - components/Auth/
   - components/Diamond/Grid/
   - components/Diamond/Filters/
   - components/Inventory/
   - components/Customer/
   - components/Cart/ (rename from cart)
   - components/Sections/ (rename from pages)
   - components/Modals/
   - components/Common/
   - components/UI/ (rename from ui)
```

---

### **PHASE 5: Component Structure - Level 2 (Move Files)**
**Goal**: Move and rename component files systematically

#### Step 5.1: Move Layout Components
```
Actions:
1. Move: components/pages/Header.tsx → components/Layout/Header.tsx
2. Move: components/Footer.tsx → components/Layout/Footer.tsx
3. Move: components/HeaderFooterWrapper.tsx → components/Layout/HeaderFooterWrapper.tsx
4. Create: components/Layout/index.ts
5. Update: All imports
```

**Files to Update**: ~15 files (all page components)

#### Step 5.2: Move Auth Components
```
Actions:
1. Move: components/ProtectedRoute.tsx → components/Auth/ProtectedRoute.tsx
2. Extract: LoginForm from pages/login/page.tsx → components/Auth/LoginForm.tsx
3. Extract: RegisterForm from pages/Register/page.tsx → components/Auth/RegisterForm.tsx
4. Extract: OtpForm from pages/otpverfication/page.tsx → components/Auth/OtpVerificationForm.tsx
5. Create: components/Auth/index.ts
6. Update: All imports
```

**Files to Update**: ~20 files

#### Step 5.3: Reorganize Diamond Components
```
Actions:
1. Move: components/Filters/* → components/Diamond/Filters/
2. Move: components/DiamondGridView.tsx → components/Diamond/Grid/DiamondGridView.tsx
3. Move: components/DiamondStockTable.tsx → components/Diamond/DiamondStockTable.tsx
4. Move: components/DiamondStockTableWithFilter.tsx → components/Diamond/DiamondStockTableWithFilter.tsx
5. Move: components/DiamondDetailView.tsx → components/Diamond/DiamondDetailView.tsx
6. Move: components/DiamondComparisonPage.tsx → components/Diamond/DiamondComparisonPage.tsx
7. Rename: components/Diamond/shared/ → components/Diamond/Shared/
8. Create: components/Diamond/index.ts
9. Update: All imports
```

**Files to Update**: ~30 files

#### Step 5.4: Move Limited Edition Components
```
Actions:
1. Rename: DiamondStockTableWithFilterlimited.tsx → DiamondStockTableWithFilterLimited.tsx
2. Rename: limitedEditionproduct.tsx → LimitedEditionProduct.tsx
3. Create: components/LimitedEdition/index.ts
4. Update: All imports
```

**Files to Update**: ~5 files

#### Step 5.5: Move Inventory Components
```
Actions:
1. Create: components/Inventory/ folder
2. Move: components/InventoryDiamondTable.tsx → components/Inventory/InventoryDiamondTable.tsx
3. Create: components/Inventory/index.ts
4. Update: All imports
```

**Files to Update**: ~3 files

#### Step 5.6: Move Dashboard & Customer Components
```
Actions:
1. Rename: components/Dashboard/page.tsx → components/Dashboard/DashboardPage.tsx
2. Create: components/Dashboard/index.ts
3. Rename: components/CustomerDetails/page.tsx → components/Customer/CustomerDetailsPage.tsx
4. Delete: components/CustomerDetails/ folder
5. Create: components/Customer/index.ts
6. Update: All imports
```

**Files to Update**: ~5 files

#### Step 5.7: Reorganize Cart Components
```
Actions:
1. Rename: components/cart/ → components/Cart/
2. Create: components/Cart/index.ts
3. Update: All imports
```

**Files to Update**: ~10 files

#### Step 5.8: Reorganize Section Components
```
Actions:
1. Rename: components/pages/ → components/Sections/
2. Rename: components/Sections/homecomponents/ → components/Sections/Home/
3. Rename: components/Sections/aboutus/ → components/Sections/AboutUs/
4. Rename: components/Sections/contactus/ → components/Sections/Contact/
5. Rename: components/Sections/diamond-source/ → components/Sections/DiamondSource/
6. Rename: components/Sections/diamondknowledge/ → components/Sections/DiamondKnowledge/
7. Rename: components/Sections/securesource/ → components/Sections/SecureSource/
8. Rename: components/Sections/sud/ → components/Sections/SellUpgradeDonate/
9. Delete: components/Sections/login/, Register/, otpverfication/ (moved to Auth)
10. Move: components/Sections/Header.tsx → components/Layout/Header.tsx
11. Move: components/Sections/HeroSection.tsx → components/Sections/Home/HeroSection.tsx
12. Rename files for consistency (BannerSection, HeroSection, etc.)
13. Create: index.ts in each subfolder
14. Update: All imports
```

**Files to Update**: ~40 files

#### Step 5.9: Move Modal & Common Components
```
Actions:
1. Create: components/Modals/ folder
2. Move: components/ConfigureAPIModal.tsx → components/Modals/ConfigureAPIModal.tsx
3. Move: components/SupplierManagementModal.tsx → components/Modals/SupplierManagementModal.tsx
4. Create: components/Modals/index.ts
5. Create: components/Common/ folder
6. Move: components/SearchBar.tsx → components/Common/SearchBar.tsx
7. Move: components/CompareButton.tsx → components/Common/CompareButton.tsx
8. Move: components/EmailButton.tsx → components/Common/EmailButton.tsx
9. Move: components/shared/AnimatedContainer.tsx → components/Common/AnimatedContainer.tsx
10. Rename: components/instaSection.tsx → components/Common/InstagramSection.tsx
11. Delete: components/shared/ folder
12. Create: components/Common/index.ts
13. Update: All imports
```

**Files to Update**: ~20 files

#### Step 5.10: Rename UI Components
```
Actions:
1. Rename: components/ui/ → components/UI/
2. Rename: components/UI/button.tsx → components/UI/Button.tsx
3. Create: components/UI/index.ts
4. Update: All imports
```

**Files to Update**: ~15 files

---

### **PHASE 6: App Router Reorganization**
**Goal**: Organize routes with route groups

#### Step 6.1: Move globals.css
```
Actions:
1. Move: src/components/globals.css → src/app/globals.css
2. Update: src/app/layout.tsx import
```

#### Step 6.2: Create Route Groups (Optional but Recommended)
```
Actions:
1. Create: app/(auth)/ folder
2. Move: app/login/, register/, verify-otp/, forgot-password/ → app/(auth)/
3. Create: app/(public)/ folder
4. Move: app/aboutUs/, contact/, diamond-source/, etc. → app/(public)/
5. Create: app/(protected)/ folder
6. Move: app/dashboard/, inventory/, cart/, etc. → app/(protected)/
7. Create: app/(admin)/ folder
8. Move: app/create-admin/, enquiry/, offer-enquiry/ → app/(admin)/
9. Rename: app/limitedEdition/ → app/(protected)/limited-edition/
10. Rename: app/diamondKnowledge/ → app/(public)/diamond-knowledge/
11. Rename: app/sud/ → app/(public)/sell-upgrade-donate/
12. Update: All navigation links
```

**Files to Update**: ~30 files

---

### **PHASE 7: Final Cleanup & Optimization**
**Goal**: Remove unused files and optimize imports

#### Step 7.1: Clean Up Unused Files
```
Actions:
1. Delete: Empty folders
2. Delete: Unused components
3. Verify: No orphaned files
```

#### Step 7.2: Create Index Files
```
Actions:
1. Create: index.ts in all folders for clean exports
2. Update: Imports to use barrel exports where appropriate
```

#### Step 7.3: Update Import Paths
```
Actions:
1. Replace: Relative imports with absolute @/ imports where beneficial
2. Standardize: Import order and formatting
3. Optimize: Remove unused imports
```

---

### **PHASE 8: Testing & Verification**
**Goal**: Ensure everything works

#### Step 8.1: Build & Type Check
```bash
npm run build
npm run lint
```

#### Step 8.2: Manual Testing
- Test all routes
- Test all features
- Verify no console errors

#### Step 8.3: Create Documentation
- Update README with new structure
- Document component locations
- Update developer guide

---

## 📊 IMPACT ANALYSIS

### Files to Rename (Naming Consistency)
| Current Name | New Name | Reason |
|-------------|----------|--------|
| `Diamondtable.ts` | `diamond.types.ts` | Consistency with other type files |
| `DiamondStockTableWithFilterlimited.tsx` | `DiamondStockTableWithFilterLimited.tsx` | Capitalization consistency |
| `limitedEditionproduct.tsx` | `LimitedEditionProduct.tsx` | PascalCase for components |
| `instaSection.tsx` | `InstagramSection.tsx` | Clear naming |
| `experience.tsx` | `Experience.tsx` | Capitalization |
| `homeContent.tsx` | `HomeContent.tsx` | Capitalization |
| `Bannersection.tsx` | `BannerSection.tsx` | Consistent casing |
| `Herosection.tsx` | `HeroSection.tsx` | Consistent casing |
| `Diamondcuts.tsx` | `DiamondCuts.tsx` | Consistent casing |
| `DiamondShapecuts.tsx` | `DiamondShapeCuts.tsx` | Consistent casing |
| `Lab-GrownDiamonds.tsx` | `LabGrownDiamonds.tsx` | Remove hyphen |
| `SellDiamondform.tsx` | `SellDiamondForm.tsx` | Consistent casing |
| `button.tsx` | `Button.tsx` | Capitalization |
| `cart/` | `Cart/` | Folder capitalization |
| `ui/` | `UI/` | Folder capitalization |
| `pages/` | `Sections/` | Clearer purpose |

### Folders to Rename
| Current Name | New Name | Reason |
|-------------|----------|--------|
| `components/pages/` | `components/Sections/` | Not actual pages, just sections |
| `components/cart/` | `components/Cart/` | Consistency |
| `components/ui/` | `components/UI/` | Consistency |
| `components/shared/` | `components/Common/` | Clearer naming |
| `components/Diamond/shared/` | `components/Diamond/Shared/` | Consistency |
| `components/pages/homecomponents/` | `components/Sections/Home/` | Clearer structure |
| `components/pages/aboutus/` | `components/Sections/AboutUs/` | Capitalization |
| `components/pages/contactus/` | `components/Sections/Contact/` | Clearer naming |
| `components/pages/diamond-source/` | `components/Sections/DiamondSource/` | Remove hyphen |
| `components/pages/diamondknowledge/` | `components/Sections/DiamondKnowledge/` | Capitalization |
| `components/pages/securesource/` | `components/Sections/SecureSource/` | Capitalization |
| `components/pages/sud/` | `components/Sections/SellUpgradeDonate/` | Descriptive name |
| `app/limitedEdition/` | `app/limited-edition/` | Kebab-case for URLs |
| `app/diamondKnowledge/` | `app/diamond-knowledge/` | Kebab-case for URLs |
| `app/sud/` | `app/sell-upgrade-donate/` | Descriptive URL |

### Files to Move (Better Organization)
| Current Location | New Location | Reason |
|-----------------|--------------|--------|
| `components/globals.css` | `app/globals.css` | Belongs with app config |
| `components/Dashboard/page.tsx` | `components/Dashboard/DashboardPage.tsx` | Not a route page |
| `components/CustomerDetails/page.tsx` | `components/Customer/CustomerDetailsPage.tsx` | Better organization |
| `components/pages/login/page.tsx` | `components/Auth/LoginForm.tsx` | Extract form logic |
| `components/pages/Register/page.tsx` | `components/Auth/RegisterForm.tsx` | Extract form logic |
| `components/pages/otpverfication/page.tsx` | `components/Auth/OtpVerificationForm.tsx` | Extract form logic |
| `components/Filters/*` | `components/Diamond/Filters/*` | Group with feature |
| `components/DiamondGridView.tsx` | `components/Diamond/Grid/DiamondGridView.tsx` | Better organization |
| `components/DiamondStockTable.tsx` | `components/Diamond/DiamondStockTable.tsx` | Group with feature |
| `components/DiamondStockTableWithFilter.tsx` | `components/Diamond/DiamondStockTableWithFilter.tsx` | Group with feature |
| `components/DiamondDetailView.tsx` | `components/Diamond/DiamondDetailView.tsx` | Group with feature |
| `components/DiamondComparisonPage.tsx` | `components/Diamond/DiamondComparisonPage.tsx` | Group with feature |
| `components/InventoryDiamondTable.tsx` | `components/Inventory/InventoryDiamondTable.tsx` | Feature grouping |
| `components/ConfigureAPIModal.tsx` | `components/Modals/ConfigureAPIModal.tsx` | Group modals |
| `components/SupplierManagementModal.tsx` | `components/Modals/SupplierManagementModal.tsx` | Group modals |
| `components/SearchBar.tsx` | `components/Common/SearchBar.tsx` | Common component |
| `components/CompareButton.tsx` | `components/Common/CompareButton.tsx` | Common component |
| `components/EmailButton.tsx` | `components/Common/EmailButton.tsx` | Common component |
| `components/shared/AnimatedContainer.tsx` | `components/Common/AnimatedContainer.tsx` | Better naming |
| `components/instaSection.tsx` | `components/Common/InstagramSection.tsx` | Better naming |
| `components/pages/Header.tsx` | `components/Layout/Header.tsx` | Layout component |
| `components/pages/HeroSection.tsx` | `components/Sections/Home/HeroSection.tsx` | Home section |
| `hooks/useDiamond*.ts` | `hooks/diamond/` | Feature grouping |
| `hooks/useInventory*.ts` | `hooks/inventory/` | Feature grouping |
| `services/api/types/*.ts` | `types/` | Centralized types |

---

## ⚠️ CRITICAL CONSIDERATIONS

### 1. **Import Path Updates**
- **Estimated files to update**: 150-200 files
- **Risk**: High (breaking imports)
- **Mitigation**: Use Find & Replace with regex, test incrementally

### 2. **Route Changes**
- **URL changes**: If we rename app folders, URLs will change
- **Risk**: Medium (broken links, SEO impact)
- **Mitigation**: 
  - Add redirects in `next.config.js`
  - Update all internal links
  - Consider keeping URL-facing folders as-is

### 3. **Git History**
- **Risk**: Losing file history with moves
- **Mitigation**: Use `git mv` instead of manual move

### 4. **Team Coordination**
- **Risk**: Merge conflicts if others are working
- **Mitigation**: 
  - Coordinate refactoring timing
  - Do in separate branch
  - Merge quickly after review

---

## 🎯 RECOMMENDED EXECUTION STRATEGY

### **Option A: Big Bang (Faster but Riskier)**
- Do all changes in one go
- Pros: Faster, cleaner
- Cons: Higher risk, harder to debug
- **Recommended for**: Small teams, low activity periods

### **Option B: Incremental (Slower but Safer)** ✅ RECOMMENDED
- Do phase by phase
- Test after each phase
- Commit after each successful phase
- Pros: Safer, easier to debug, can pause
- Cons: Takes longer
- **Recommended for**: Active development, larger teams

### **Option C: Hybrid (Balanced)**
- Group related changes
- Do 2-3 phases at once
- Test after each group
- Pros: Balanced speed and safety
- Cons: Moderate complexity

---

## 📈 ESTIMATED EFFORT

| Phase | Estimated Time | Risk Level | Priority |
|-------|---------------|------------|----------|
| Phase 1: Preparation | 30 min | Low | High |
| Phase 2: Types | 1-2 hours | Medium | High |
| Phase 3: Hooks | 1 hour | Low | High |
| Phase 4: Folders | 30 min | Low | Medium |
| Phase 5: Components | 4-6 hours | High | High |
| Phase 6: App Router | 2-3 hours | Medium | Medium |
| Phase 7: Cleanup | 1-2 hours | Low | Low |
| Phase 8: Testing | 2-3 hours | Low | High |
| **TOTAL** | **12-18 hours** | **Medium** | - |

---

## ✅ SUCCESS CRITERIA

1. ✅ **Build succeeds** without errors
2. ✅ **All tests pass** (if any)
3. ✅ **No linter errors**
4. ✅ **All routes work** correctly
5. ✅ **All features function** as before
6. ✅ **Consistent naming** throughout
7. ✅ **Logical folder structure**
8. ✅ **Clean imports** (no relative path hell)
9. ✅ **Documentation updated**
10. ✅ **Team approval** received

---

## 🚀 NEXT STEPS

1. **Review this plan** with the team
2. **Choose execution strategy** (A, B, or C)
3. **Set timeline** for execution
4. **Create backup** branch
5. **Begin Phase 1** when ready

---

## 📚 BENEFITS AFTER REFACTORING

### Developer Experience
- ✅ Easier to find components
- ✅ Clearer project structure
- ✅ Consistent naming conventions
- ✅ Better code organization
- ✅ Reduced cognitive load

### Maintainability
- ✅ Easier to onboard new developers
- ✅ Clearer feature boundaries
- ✅ Better separation of concerns
- ✅ Easier to refactor individual features

### Scalability
- ✅ Room for growth in each feature area
- ✅ Clear patterns for new features
- ✅ Better code reusability
- ✅ Easier to extract to packages if needed

---

## 📞 QUESTIONS TO ANSWER BEFORE STARTING

1. ❓ Do we want to change URLs (app folder names)?
2. ❓ Should we use route groups in app/?
3. ❓ Do we want to extract auth forms or keep them in pages?
4. ❓ Should we rename 'sud' to something more descriptive?
5. ❓ Do we want barrel exports (index.ts) everywhere?
6. ❓ What's the timeline for this refactoring?
7. ❓ Who will review the changes?
8. ❓ Do we need to update any documentation?

---

**Document Version**: 1.0  
**Created**: 2025-12-28  
**Status**: READY FOR REVIEW  
**Estimated Total Effort**: 12-18 hours  
**Recommended Approach**: Incremental (Option B)


