# Store Planning Application

This project is a React Vite-based application for managing stores and SKUs, with planning features, an AG-Grid table, and data visualization using charts.

## Features

1. **Top Navigation Bar**
   - Displays the company logo on the left.
   - If authentication is implemented, a sign-in/sign-out menu appears on the right.

2. **Left Navigation Menu**
   - Contains icons and labels for different screens.

3. **Store Management Screen**
   - Add, remove, update, and reorder stores.

4. **SKU Management Screen**
   - Add, remove, and update SKUs, including Prices and Costs.

5. **Planning Screen (AG-Grid Implementation)**
   - Displays a cross-join of Stores and SKUs along rows, and Calendar grouped by Weeks under Months along columns.
   - Editable field: Sales Units (integer values).
   - Non-editable calculated fields:
     - **Sales Dollars:** `Sales Units * Price` (formatted as currency).
     - **GM Dollars:** `Sales Dollars - (Sales Units * Cost)` (formatted as currency).
     - **GM %:** `(GM Dollars / Sales Dollars) * 100` (formatted as percentage).
   - Conditional Formatting for GM %:
     - Green: `>= 40%`
     - Yellow: `10% <= GM% < 40%`
     - Orange: `5% <= GM% < 10%`
     - Red: `<= 5%`

6. **(Optional) Chart Page**
   - Allows Store selection.
   - Displays **GM Dollars** and **GM %** using a dual-axis bar chart.
   - Data Aggregation:
     - GM Dollars and Sales Dollars are totaled across all SKUs per Store.
     - GM % is recalculated using the totals.

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Clone the Repository
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Install Dependencies
```sh
npm install
```

### Run the Development Server
```sh
npm run dev
```
The application should now be running at `http://localhost:5173/`.

---

## Build for Production
```sh
npm run build
```
The build output will be in the `dist/` folder.

---

## Deployment
You can deploy the application to **GitHub Pages**, **Vercel**, **Netlify**, or any static hosting platform.

### Deploy to GitHub Pages
```sh
git add .
git commit -m "Deploy app"
git push origin main
```

---

## Tech Stack
- **React (Vite)** - Fast development environment
- **AG-Grid** - Grid implementation for planning data
- **Recharts** - Charting library
- **Redux** (Optional) - State management

For any issues or feature requests, feel free to open a GitHub issue!

---

### Author
Created by Rahul Pandey 🚀

