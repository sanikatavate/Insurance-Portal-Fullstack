# Agile Insurance

**Agile Insurance** is a modern React + Vite frontend for an AI-powered insurance platform. It is designed to showcase a premium insurance experience with a polished landing page, category browsing, policy details, secure checkout flow, and a dashboard experience for authenticated users.

The live deployed version is here:

- https://insurance-ui-design.vercel.app/

---

## Project overview

This project is a **frontend-only insurance web application** built to demonstrate how a user can:

1. Explore different insurance categories.
2. Compare policies with AI-inspired summaries and filters.
3. View policy details and benefits.
4. Register or log in to a demo account.
5. Visit a protected dashboard for account-related actions.
6. Experience a polished, responsive UI with animations and premium design.

This is **not a real production insurance backend**. Authentication and account data are simulated in the browser using `localStorage`.

---

## What the application does

### 1. Landing page

The landing page introduces the product and shows:

- A hero section with a premium insurance message.
- A featured services section.
- A trust/partner scrolling strip.
- A testimonials section.
- A status section.
- About and choice sections.

### 2. Insurance categories

Users can browse categories such as:

- Health Insurance
- Term Insurance
- Car Insurance
- Life Insurance
- Travel Insurance
- Home Insurance
- Business Insurance

Each category page includes:

- A category banner
- AI-style policy cards
- Search and filter controls
- Sorting options
- Policy comparison support

### 3. Policy details page

Each policy has a dedicated details page showing:

- Premium pricing
- Coverage details
- Claim settlement ratio
- Policy validity
- Key benefits
- Exclusions
- Claim process steps
- FAQ section
- Review cards
- Buy / brochure actions

### 4. Authentication Page Related Info:

The auth page provides a demo sign-in and sign-up experience:

- Register with full name, email, phone, and password
- Log in with stored demo credentials
- Redirect users back to the page they were trying to access

### 5. Protected routes and dashboard

After login, the app protects routes such as:

- Checkout
- Payment success
- Dashboard

The dashboard includes sections for:

- Overview
- Policies
- Claims
- Payments
- Renewals
- Documents
- AI Support
- Notifications
- Profile
- Security

### 6. Mobile and responsive UI

The project is responsive and includes:

- A mobile-only hamburger menu in the header
- Responsive layouts for desktop, tablet, and phone
- Smooth animations and motion effects

---

## Tech stack

### Frontend

- React 19
- React Router DOM
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Icons
- Swiper
- Axios

### Main implementation style

- Component-based React architecture
- Route-based page structure
- Local storage-based demo authentication
- Reusable UI sections and page layouts

---

## Project structure

```text
Frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── assets.js
│   │   └── Images/
│   ├── components/
│   │   ├── AboutUs.jsx
│   │   ├── ChoiceUS.jsx
│   │   ├── FloatingAiAssistant.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── NavBer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── Status.jsx
│   │   └── Testimonial.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── authContextInstance.js
│   │   └── useAuth.js
│   ├── data/
│   │   └── catalog.js
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── pages/
│   │   ├── AuthPage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── PolicyDetailsPage.jsx
│   │   ├── PaymentSuccessPage.jsx
│   │   └── dashboard/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── eslint.config.js
```

### Important source files

- `src/App.jsx` — defines all routes and protected route behavior
- `src/main.jsx` — app entry point and provider setup
- `src/components/HeroSection.jsx` — landing page top section
- `src/components/NavBer.jsx` — header and mobile menu
- `src/pages/CategoryPage.jsx` — category browsing and policy filtering
- `src/pages/PolicyDetailsPage.jsx` — policy info, pricing, buy option, FAQ
- `src/pages/AuthPage.jsx` — demo registration and login
- `src/contexts/AuthContext.jsx` — localStorage-based user state
- `src/data/catalog.js` — mock policy catalog used throughout the app

---

## How to run the project locally

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

From the `Frontend` folder, run:

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

- http://localhost:5173

### Build for production

```bash
npm run build
```

### Preview production build locally

```bash
npm run preview
```

---

## How to use the app

### As a visitor

1. Open the homepage.
2. Browse the insurance services and trusted partner section.
3. Visit a category page by clicking on a service card.
4. Use search and filters to compare available policies.
5. View details on a selected policy.

### As a demo user

1. Click **Sign In** or open the auth page.
2. Use **Create Account** to register a new demo account.
3. After registration, you can access protected pages.
4. Go to a policy detail page and click **Buy Now**.
5. Complete the simulated checkout flow and reach the payment success page.

### Dashboard usage

Once logged in, access the dashboard from the header or by visiting `/dashboard`.

You can use the dashboard to view:

- policy summaries
- claim information
- payment records
- renewal options
- document storage
- AI support
- profile and security settings

---

## Authentication and data behavior

This app uses a **demo authentication model**:

- User registration data is saved in `localStorage`
- Login verifies the saved demo credentials
- Protected routes redirect unauthenticated users to the auth page
- The app does not connect to a real backend API

This means:

- It is excellent for UI demos and frontend development
- It is not suitable for real user data, payments, or production-grade security

---

## Deployment

This project is deployed on **Vercel**.

### Live URL

- https://insurance-ui-design.vercel.app/

### Deployment notes

- The project is hosted from the `Frontend` folder.
- Vercel builds the React app using the `npm run build` command.
- The output is served as a static site.

If you redeploy locally, you can connect your GitHub repository to Vercel and set the root directory to `Frontend`.

---

## Key features summary

- Premium landing page and marketing layout
- Responsive navigation with mobile menu
- Category-based policy browsing
- Policy comparison and filtering tools
- Policy detail pages with benefits, exclusions, FAQs, and pricing
- Demo authentication
- Protected checkout and dashboard flows
- Smooth animations and modern UI design
- Deployed live on Vercel

---

## Notes and limitations

- This is a **frontend showcase/demo project**.
- There is **no real backend API** for payments, claims, or user authentication.
- Document downloads and payment actions are simulated in the UI.
- Sensitive production actions should be handled by a real backend and database.

---

## Support

If you want to modify or extend the app:

- Update the mock policy data in `src/data/catalog.js`
- Adjust layout and branding in `src/components/HeroSection.jsx` and `src/components/NavBer.jsx`
- Add a real backend for authentication, checkout, and claims later

For any UI or feature changes, the easiest place to start is the `src/pages` and `src/components` folders.

---

## Quick command reference

```bash
npm i
npm run dev
npm run build
npm run preview
```

If you want, I can also prepare a **README for the root repository** and a **deployment checklist for Vercel** next.
