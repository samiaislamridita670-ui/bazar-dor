# 🛒 বাজার দর | Bazar-Dor

### বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে

Bazar-Dor is a responsive web application designed to display the prices of essential products in Bangladesh. Users can explore product categories, compare prices, identify price increases and decreases, and view product details through a clean and user-friendly interface.

## ✨ Features

* **📊 Daily Market Prices:** View the current prices of essential products.
* **📈 Price Changes:** Explore products with increasing and decreasing prices.
* **🛍️ Product Details:** View individual product information and market prices.
* **📂 Category Filtering:** Browse products by categories such as rice, lentils, oil, vegetables, fish, and meat.
* **🔢 Price Sorting:** Sort products by price from low to high or high to low.
* **📱 Responsive Design:** Enjoy a responsive interface on mobile, tablet, and desktop devices.
* **🔐 Authentication:** Sign-up and sign-in functionality using Better Auth.
* **👤 Profile Management:** Access the profile and update-information pages.
* **🔔 Toast Notifications:** Display feedback messages for relevant user actions.
* **🚫 Error Handling:** Custom error and not-found pages for a better user experience.

## 🛠️ Technologies Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* DaisyUI
* Better Auth
* MongoDB
* React Hot Toast
* REST API

## 🚀 Getting Started

### Prerequisites

Make sure the following tools are installed:

* Node.js
* npm
* Git

### Installation

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project directory**

```bash
cd bazar-dor
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and configure the required environment variables for the API, Better Auth, MongoDB, and OAuth providers.

Never commit database credentials, authentication secrets, or OAuth secrets to GitHub.

**5. Start the development server**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🔌 API Configuration

The application uses the Bazar-Dor API to retrieve product and category information.

**Base API URL:**

`https://api.abcz.workers.dev/api/bazardor`

Available endpoints:

| Endpoint                  | Description                  |
| ------------------------- | ---------------------------- |
| `/products`               | Retrieve products            |
| `/categories`             | Retrieve categories          |
| `/products?category=chal` | Filter products by category  |
| `/products/1`             | Retrieve a product by ID     |
| `/categories/chal`        | Retrieve a specific category |

## 📁 Project Structure

```text
bazar-dor/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── category/
│   │   ├── components/
│   │   ├── product/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Authentication

The project uses Better Auth for user authentication.

The planned authentication features include:

* Email and password registration.
* Email and password login.
* Google and GitHub social login.
* User logout.
* Profile information updates.
* Protected product-detail routes.

Authentication features must be configured and tested before production deployment.

## 📱 Responsive Experience

Bazar-Dor is designed to provide a consistent browsing experience across different screen sizes. Product grids, navigation, and page sections adapt to mobile, tablet, and desktop layouts.

## ⚠️ Disclaimer

Market prices may vary by location, market conditions, and time. Displayed prices should be treated as indicative information rather than guaranteed prices.

## 👩‍💻 Project Information

* **Project Name:** Bazar-Dor (বাজার দর)
* **Assignment:** Programming Hero Assignment 07
* **Framework:** Next.js App Router

---

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
