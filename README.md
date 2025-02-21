# 📊 Personal Finance Visualizer

A simple web application to track personal finances with basic transaction tracking.

🚀 Features (Stage 1 & Stage 2)
Stage 1: Basic Transaction Tracking
✅ Add/Edit/Delete transactions (amount, date, description)
✅ View transaction list
✅ Monthly expenses bar chart
✅ Basic form validation

Stage 2: Categories
✅ Predefined categories for transactions
✅ Category-wise pie chart
✅ Dashboard with summary cards:Total expenses,Category breakdown,Most recent transactions

Stage 3: Budgeting
✅ Set monthly category budgets
✅ Budget vs. actual comparison chart

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Charts:** Recharts
- **Database:** MongoDB (Mongoose)
- **State Management:** React Hooks
- **Deployment:** Vercel (Frontend) & MongoDB Atlas (Database)

---

## 📂 Folder Structure

```
/finance-visualizer
│── /app
│   ├── /api
│   │   ├── /transactions
│   │   │   └── route.ts   # API for transactions
│   │   │   └── [id]
│   │   │   │   └── route.ts
│── /lib
│   ├── db.ts              # MongoDB connection
│   ├── /models
│   │   └── Transaction.ts # Mongoose model
│── /types
│   └── types.ts   # TypeScript types
│── /components
│── .env.local
│── next.config.js
│── package.json
│── tsconfig.json
```

---

## 🛠️ Setup Instructions

### 1⃣ Clone the Repository

```sh
git clone https://github.com/prem0617/finance-managemet
cd finance-managemet
```

### 2⃣ Install Dependencies

```sh
npm install
# or
yarn install
```

### 3⃣ Configure Environment Variables

Create a `.env.local` file and add:

```
MONGODB_URI=your_mongodb_connection_string
```

### 4⃣ Run the Development Server

```sh
npm run dev
# or
yarn dev
```

App runs at: **`http://localhost:3000`**

Made with ❤️ using **Next.js, MongoDB & Recharts** 🚀
