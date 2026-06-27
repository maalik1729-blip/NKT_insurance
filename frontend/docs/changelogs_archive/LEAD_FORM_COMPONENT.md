# LeadForm Component

**Status:** ✅ Complete  
**File:** `src/components/LeadForm.tsx`  
**Used on:** Homepage (`/`), Contact page (`/contact`)  
**Date:** June 2026

---

## Overview

`LeadForm` is the primary lead-capture component. It collects a visitor's name, phone number, and insurance interest, saves the submission to `localStorage` for the Admin Portal to display, then redirects the user to a pre-filled WhatsApp conversation with the advisor.

---

## Props

```ts
interface LeadFormProps {
  heading?: string; // Default: "Request a callback"
}
```

The `heading` prop lets each page customise the form title without needing a separate component.

**Usage examples:**

```tsx
<LeadForm />                                  // Default heading
<LeadForm heading="Start the conversation" /> // Contact page
<LeadForm heading="Get your free quote" />    // Custom CTA
```

---

## Fields

| Field      | Type     | Required | Validation                                              |
| ---------- | -------- | -------- | ------------------------------------------------------- |
| `name`     | `text`   | Yes      | Non-empty after trim                                    |
| `phone`    | `tel`    | Yes      | Must contain ≥10 digits (ignoring non-digit characters) |
| `interest` | `select` | No       | Default empty — "Select insurance type"                 |

### Insurance Interest Options

```
(Select insurance type)  — default/empty
Life Insurance           — value: "life"
Health Insurance         — value: "health"
Motor Insurance          — value: "motor"
Multiple types           — value: "multiple"
Not sure yet             — value: "not-sure"
```

---

## Validation

Client-side only. Runs on submit before any action is taken.

```ts
type FieldErr = { name?: string; phone?: string };

const next: FieldErr = {};
if (!name) next.name = "Please enter your name";
if (!phone || phone.replace(/\D/g, "").length < 10)
  next.phone = "Please enter a valid 10-digit number";
setErrors(next);
if (Object.keys(next).length) return; // abort if errors
```

**Error display:**

- Each field has a `<span class="form-helper">` below it
- Error text appears in the helper span via `data-error="true"`
- `aria-invalid="true"` is set on the input when its field has an error
- `aria-describedby` links the input to its helper span
- Helper span always occupies space (`\u00A0` = non-breaking space when no error) — prevents layout shift when errors appear

---

## Submit Flow

```
1. Validate fields
   ↓ (pass)
2. Save lead to localStorage
   ↓
3. Redirect to WhatsApp
```

### Step 2 — localStorage Lead Save

```ts
const newLead = {
  id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9),
  name,
  phone,
  email: `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@example.com`,
  interest: interest || "not-sure",
  status: "new",
  premium:
    interest === "life"
      ? 45000
      : interest === "health"
        ? 18000
        : interest === "motor"
          ? 12000
          : 20000,
  notes: "Submitted callback request from website callback form.",
  createdAt: new Date().toISOString(),
};
```

**Key points:**

- Email is synthesised from name (e.g. "Ramesh Kumar" → `ramesh.kumar@example.com`) since the form doesn't collect email
- Premium is a rough estimate for the advisor's lead value view
- Status always starts as `"new"`
- Lead is `unshift`-ed to the front of the array (newest first)
- Wrapped in `try/catch` — localStorage failure does not block WhatsApp redirect

### Step 3 — WhatsApp Redirect

```ts
window.location.href =
  `https://wa.me/${WA_NUMBER}?text=Hi%20NKT%2C%20I%27m%20${encodeURIComponent(name)}` +
  `%20and%20I%27d%20like%20advice%20on%20${encodeURIComponent(interest)}%20insurance.`;
```

Pre-filled message example:

```
Hi NKT, I'm Ramesh Kumar and I'd like advice on life insurance.
```

- Uses `WA_NUMBER = "917845349914"` from `icons.tsx`
- `encodeURIComponent` prevents injection from name/interest values
- `window.location.href` — opens in same tab (WhatsApp web or app takes over)

---

## Accessibility

| Feature              | Implementation                                                         |
| -------------------- | ---------------------------------------------------------------------- |
| Form label           | `<label htmlFor="name">` associated with `<input id="name">`           |
| Required indicator   | `required` attribute + `aria-required="true"`                          |
| Error state          | `aria-invalid="true"` on field with error                              |
| Error message        | `aria-describedby` links field to its `<span>`                         |
| Live region          | `aria-live="polite"` on helper span (error appears without disruption) |
| Form label           | `aria-label="Consultation request form"` on `<form>`                   |
| No native validation | `noValidate` on form — custom validation used instead                  |

---

## Styling

The component uses CSS classes from `styles.css` (not inline styles):

```
.form-card         — white card container with border + shadow
.form-group        — vertical stack: label + input + helper
.form-input        — shared input/select style
.form-select       — select-specific overrides (combined with form-input)
.form-helper       — helper/error text below field
.form-submit       — full-width submit button (extends .btn .btn-primary)
.form-note         — small disclaimer text below button
```

**Error state class:**

- `data-error="true"` on `.form-helper` triggers red error text via CSS attribute selector
- Input `aria-invalid="true"` triggers red border via CSS

---

## Form Note (Disclaimer)

```
We'll call or WhatsApp you within 30 minutes during business hours (9 AM – 8 PM).
```

This sets honest expectations and reduces form abandonment anxiety.

---

## Integration with Admin Portal

When a visitor submits the LeadForm, the lead is immediately available in the **Advisor Dashboard** (`/admin`) because both read/write the same `localStorage` key (`nkt_leads`).

The advisor sees:

- Name, phone, interest from the form
- Status = "new" (unread)
- Estimated premium for lead prioritisation
- Timestamp for recency sorting

---

## Before vs After

| Aspect             | Before                        | After                                       |
| ------------------ | ----------------------------- | ------------------------------------------- |
| Lead capture       | Form submitted, nothing saved | Lead saved to localStorage for Admin Portal |
| Redirect           | Direct WhatsApp link          | localStorage save → WhatsApp redirect       |
| Validation errors  | Basic browser native          | Custom inline error messages with ARIA      |
| Error layout shift | Yes (errors added height)     | No (helper span always reserves space)      |
| Form heading       | Hardcoded                     | Configurable via `heading` prop             |

---

## Files

- `src/components/LeadForm.tsx` — Component source
- `src/styles.css` — Form CSS classes (`.form-card`, `.form-group`, etc.)
- `src/components/icons.tsx` — `WA_NUMBER` constant
