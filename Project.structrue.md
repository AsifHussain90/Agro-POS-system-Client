src/
├── components/
│   ├── auth/          # AuthGuard, AuthRedirect, RoleGuard
│   ├── forms/         # AddressForm, ProductForm, etc.
│   ├── layout/        # RootLayout, DashboardLayout, Navbar, Sidebar, MobileNav, Footer
│   ├── shared/        # DataTable, PageHeader, SearchFilter, StatCard, StatusBadge, EmptyState, etc.
│   └── ui/            # Radix / Tailwind UI primitives
├── hooks/             # useApi, useAuth, useCart
├── lib/               # api, constants, mockApi, utils
├── pages/
│   ├── admin/         # Admin dashboard, users, buyers, requests, orders
│   ├── auth/          # Login, Register, Change Password
│   ├── buyer/         # Orders, Profile, Checkout
│   ├── farmer/        # Farmer dashboard, products management, orders
│   ├── public/        # Home, Marketplace, Product Detail, Track Order
│   └── user/          # Farmer Application / Requests
├── providers/         # QueryProvider, ThemeProvider
├── router/            # App routes & router configuration (or App.tsx)
├── stores/            # Zustand stores (authStore, cartStore)
├── types/             # Domain and API types
├── App.tsx            # Main App wrapper (providers + router)
├── main.tsx           # React DOM root entry
└── index.css          # Tailwind CSS theme & tokens