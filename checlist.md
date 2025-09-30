🎯 Goal
	•	Да се изгради малко Invoicing UI приложение с Vue 3 + CRUD операции.
	•	Backend: MockAPI (https://68da7d4b23ebc87faa304fad.mockapi.io/invoices) или друг (Supabase, Firebase, JSON Server), стига структурата и CRUD да са същите.
	•	Всички суми да са в EUR, форматирани с 2 десетични знака.

⸻

🖥 Pages

1. Invoices List
	•	Таблица:
number, customerName, date, dueDate, subtotal, vat, total, status, actions(Edit/Delete).
	•	Контроли:
	•	Search по customerName (client-side, debounce 300–500ms).
	•	New Invoice бутон.
	•	Състояния:
	•	Loading skeleton.
	•	Empty state: “No invoices”.
	•	Inline error banner при fetch грешка.
	•	Delete flow:
	•	Confirm диалог.
	•	Успешно изтриване → премахва реда + toast.

⸻

2. Invoice Editor + Live Preview (single page, split layout)

Form (ляво)
	•	Задължителни полета:
customerName, number, date, dueDate, status (unpaid|paid|draft),
	•	поне 1 item (description, quantity > 0, unitPrice ≥ 0).
	•	Items:
	•	Add/remove редове.
	•	Item total = quantity * unitPrice (read-only).
	•	Действия:
	•	Save (create/update).
	•	Cancel (back to list).

Preview (дясно)
	•	Placeholder logo.
	•	Seller block (hardcoded).
	•	Customer block (данни от формата).
	•	Items table, subtotal, VAT, total.
	•	Updates live при промени във формата.

Validation
	•	Inline per field.
	•	Form-level: „At least one item required“.

⸻

📊 Data & Calculations

Data structure (Invoice)
{
  "date": "2025-09-29",
  "number": "INV-2001",
  "dueDate": "2025-10-15",
  "customerName": "Tech Solutions Ltd.",
  "customerEmail": "finance@techsolutions.com",
  "subtotal": 750,
  "vat": 91,
  "total": 825,
  "items": [
    {
      "description": "Website Design",
      "quantity": 5,
      "unitPrice": 100,
      "total": 500
    }
  ],
  "id": "6",
  "status": "unpaid"
}

Client-side изчисления
	•	item.total = quantity * unitPrice
	•	subtotal = sum(item.total)
	•	vat = round(subtotal * 0.20) (20% VAT)
	•	total = subtotal + vat
	•	Всички тези полета се изпращат при POST/PUT/PATCH.

⸻

🌐 API (CRUD)
	•	GET /invoices → списък
	•	GET /invoices/:id → детайл
	•	POST /invoices → create (всички полета без id)
	•	PUT/PATCH /invoices/:id → update
	•	DELETE /invoices/:id → delete

UX правила:
	•	Показвай loading на засегнатата зона (таблица/бутон).
	•	Toast/alert при error.
	•	Disable buttons докато request-a върви.

⸻

⚙️ Tech Stack / Requirements
	•	Vue 3 + Vite
	•	Vue Router (2 routes)
	•	Composition API
	•	HTTP: Fetch или Axios
	•	Styling: Tailwind / Naive / Element Plus (леко)
	•	TypeScript (предпочитан; JSDoc ако не)
	•	Env var: VITE_API_BASE_URL

⸻

✅ Acceptance Checklist

List
	•	Fetch invoices с loading + error states.
	•	Client-side search by customerName (debounced).
	•	Delete with confirm + toast.
	•	Empty state shown.

Editor / Preview
	•	Form validates required fields + at least 1 item.
	•	Live totals (items, subtotal, VAT=20%, total).
	•	Add/remove items recalculates totals.
	•	Save → API create/update → success toast + back to list.
	•	Cancel → back без save.
	•	Preview mirrors form live.

General
	•	Disabled buttons по време на requests.
	•	Clear error messages.
	•	Consistent spacing.

⸻

📦 Deliverables
	•	GitHub repo със source + README:
	•	Run instructions.
	•	Tech choices.
	•	Env var (VITE_API_BASE_URL).
	•	Acceptance checklist.
	•	(Бонус) Deployed link (Vercel/Netlify).
	•	(Бонус) GIF/скрийншот в README.

⸻

📝 To-Do List (чеклист за проекта)

Setup
	•	Vue 3 + Vite проект.
	•	Добави Vue Router (2 маршрута: /, /invoices/:id?).
	•	Добави TailwindCSS (или друга лека библиотека).
	•	Конфигурирай .env с VITE_API_BASE_URL.

API & Types
	•	Създай types/Invoice.ts.
	•	Създай API client (axios/fetch wrapper).
	•	Имплементирай CRUD методи (getInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice).

Invoices List Page
	•	Имплементирай таблица с всички полета.
	•	Добави търсене (debounced 300–500ms).
	•	Loading skeleton.
	•	Empty state („No invoices“).
	•	Error banner при fetch проблем.
	•	Delete flow (confirm + toast + remove row).
	•	Disabled state на action бутони при request.

Invoice Editor Page
	•	Форма с всички задължителни полета.
	•	Items array с add/remove редове.
	•	Inline validation per field.
	•	Form-level validation (поне 1 item).
	•	Изчисления: item.total, subtotal, vat=20%, total.
	•	Save → API call → toast + redirect към list.
	•	Cancel → redirect без save.

Live Preview
	•	Layout split: form (ляво), preview (дясно).
	•	Placeholder logo + hardcoded seller block.
	•	Customer block популира от формата.
	•	Items table + totals.
	•	Updates live при промяна на формата.

General
	•	Toast system (успех/грешка).
	•	Disabled бутони по време на request.
	•	Consistent spacing + clean UI.

Deliverables
	•	README.md (run инструкции, tech choices, env var).
	•	Acceptance checklist включен в README.
	•	(Бонус) Deploy на Vercel/Netlify.
	•	(Бонус) GIF/скрийншот в README.
