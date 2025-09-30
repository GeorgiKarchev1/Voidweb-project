
<img width="1053" height="478" alt="image" src="https://github.com/user-attachments/assets/9d3886f9-eb97-4395-aca8-04697b25d128" />


# Invoice Manager

A modern invoice management application built with Vue 3, TypeScript, and Tailwind CSS. This application provides full CRUD operations for managing invoices with a clean, responsive interface and live preview functionality.

## Features

- **Invoice List**: View all invoices in a responsive table with search functionality
- **Create/Edit Invoices**: Two-column layout with form and live preview
- **Real-time Calculations**: Automatic calculation of subtotals, VAT (20%), and totals
- **Validation**: Comprehensive client-side validation with inline error messages
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Search**: Debounced search functionality by customer name (350ms delay)
- **Status Management**: Track invoice status (draft, unpaid, paid)
- **Error Handling**: Graceful error handling with user-friendly messages

##  Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Vue Router** - Official router for Vue.js
- **Tailwind CSS** - Utility-first CSS framework
- **Fetch API** - For HTTP requests

## Requirements

- Node.js (version 16 or higher)
- npm or yarn package manager

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voidweb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file to set your API base URL:
   ```env
   VITE_API_BASE_URL=https://68da7d4b23ebc87faa304fad.mockapi.io/invoices
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🧪 Manual Testing Scenarios

### Test Case 1: Initial Load
1. Start the application
2. Verify the table shows loading skeleton, then displays data
3. Check that the "New Invoice" button is visible

### Test Case 2: Empty State
1. Delete all invoices from the API
2. Refresh the page
3. Verify "No invoices" empty state is displayed
4. Check that "New Invoice" button in empty state works

### Test Case 3: Search Functionality
1. Enter part of a customer name in the search box
2. Verify results are filtered (debounced with 350ms delay)
3. Clear search and verify all invoices return

### Test Case 4: Create New Invoice
1. Click "New Invoice"
2. Fill valid form with 2 items:
   - Invoice Number: INV-001
   - Date: Today's date
   - Due Date: 30 days from today
   - Customer Name: Test Customer
   - Customer Email: test@example.com
   - Item 1: Website Design, Qty: 5, Unit Price: 100
   - Item 2: Consultation, Qty: 2, Unit Price: 50
3. Verify live preview updates as you type
4. Check calculations: Subtotal: 600, VAT: 120, Total: 720
5. Click "Create Invoice"
6. Verify success toast and redirection to list
7. Check new record appears in the list with correct totals

### Test Case 5: Edit Invoice
1. Click "Edit" on an existing invoice
2. Change quantity of an item
3. Verify totals update in real-time
4. Click "Update Invoice"
5. Verify changes are saved and reflected in the list

### Test Case 6: Delete Invoice
1. Click "Delete" on an invoice
2. Confirm deletion in the dialog
3. Verify row is removed from table
4. Check success toast is displayed

### Test Case 7: Validation
1. Try to create invoice with empty required fields
2. Verify inline validation errors appear
3. Try to remove all items
4. Verify "At least one item required" error
5. Check that Save button is disabled when form is invalid

### Test Case 8: Error Handling
1. Set incorrect `VITE_API_BASE_URL` in .env
2. Restart the application
3. Verify error banner appears with retry button
4. Click retry button and verify it attempts to reload

### Test Case 9: Live Preview
1. Go to invoice editor
2. Type in various fields
3. Verify preview updates immediately
4. Add/remove items and verify preview reflects changes
5. Check that all calculations display correctly formatted currency

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── EmptyState.vue   # Empty state component
│   ├── InvoicePreview.vue # Live preview component
│   ├── ItemRow.vue      # Invoice item row component
│   ├── LoadingSkeleton.vue # Loading skeleton
│   └── Toast.vue        # Toast notification component
├── views/               # Page components
│   ├── InvoicesList.vue # Invoice list page
│   └── InvoiceEditor.vue # Invoice create/edit page
├── router/              # Vue Router configuration
│   └── index.ts         # Route definitions
├── api/                 # API layer
│   ├── client.ts        # HTTP client utilities
│   └── invoices.ts      # Invoice API endpoints
├── utils/               # Utility functions
│   ├── calculations.ts  # Invoice calculations
│   ├── currency.ts      # Currency formatting
│   ├── format.ts        # Date formatting
│   └── validators.ts    # Validation logic
├── types/               # TypeScript type definitions
│   └── invoice.ts       # Invoice-related types
├── App.vue              # Root component
├── main.ts              # Application entry point
└── style.css            # Global styles
```

## 🎯 API Endpoints

The application expects the following REST API endpoints:

- `GET /invoices` - Fetch all invoices
- `GET /invoices/:id` - Fetch single invoice
- `POST /invoices` - Create new invoice
- `PUT /invoices/:id` - Update invoice
- `DELETE /invoices/:id` - Delete invoice



