## Contact Page

### Goal
Create a dedicated `/contact` route with a full Contact page, and update the header navigation so the Contact menu item links to it instead of scrolling to the home-page newsletter section.

### Changes

1. **Create `src/pages/Contact.tsx`**
   - Follow existing page conventions: `SiteNav`, `AnimatedSection`, `BrushStrokeDivider`, `SiteFooter`, `BackToTop`, `CountdownBanner`, `NewsletterCTA`.
   - Page header with title "Get in Touch" and subtitle.
   - **Contact info section:**
     - Festival name and organizer (Ralston HINGE Creative District)
     - Address: 5500 S 77th St, Ralston, NE 68127
     - Phone: (402) 953-9173
     - Social links: Facebook, Instagram
   - **Contact form:** name, email, subject, message — with Zod validation and a submit handler that shows a success state (no backend; form submission will be handled client-side with a toast/confirmation message).
   - Set `<title>` and meta description for SEO.

2. **Add route in `src/App.tsx`**
   - Import `Contact` page.
   - Add `<Route path="/contact" element={<Contact />} />` above the catch-all `*` route.

3. **Update `src/components/SiteNav.tsx`**
   - Change the Contact nav link from `href: "/#contact"` to `href: "/contact"`.
   - No other nav changes needed.

### Out of scope
- Backend form submission (no database table or API endpoint; client-side only for now).
- The home-page `#contact` anchor section remains as-is; visitors on the home page can still scroll to the newsletter CTA.