# ARTEEVA — Corporate Consultants & Contractors Website

A corporate website for **ARTEEVA**, a premier construction and civil engineering contracting company specializing in commercial complexes, luxury residential estates, heavy industrial logistics hubs, and infrastructure developments.

Built strictly according to engineering web standards using **HTML5, CSS3, Bootstrap 5.3, and minimal Vanilla JavaScript**, with an integrated **Google Apps Script** serverless email backend.

---

## 1. Technologies Used

* **HTML5:** Semantic architecture, accessible forms, OpenGraph social cards, Twitter cards, and Schema.org JSON-LD microdata.
* **CSS3:** Custom luxury corporate palette (Deep Navy `#071A33`, Primary Navy `#0B2545`, Gold `#C9A227`, Pure White `#FFFFFF`), responsive typography (`Cinzel` and `Plus Jakarta Sans`), and subtle CSS transitions.
* **Bootstrap 5.3:** Responsive 12-column grid, utility classes, and components.
* **Bootstrap Icons 1.11.3:** Vector architectural and construction iconography.
* **Vanilla JavaScript (ES6+):** Zero-dependency controller for sticky navigation, active link highlighting, project filtering, modal specs, animated statistics, and asynchronous form transmission.
* **Google Apps Script:** Serverless Web App backend for receiving and routing contact inquiries directly to company corporate email without requiring PHP or Node.js mail servers.

---

## 2. Directory & File Structure

```text
ARTEEVA/
├── index.html              # Home page: Hero, Company Intro, Core Services, USPs, Stats, Featured Projects, CTA
├── about.html              # About page: Corporate Profile, Mission, Vision, Core Values, 6-Stage Lifecycle
├── services.html           # Services page: 8 Detailed Consultants & Contractors service breakdowns
├── expertise.html          # Expertise page: 9 Engineering disciplines, BIM, QA/QC, Safety & Compliance matrix
├── projects.html           # Projects page: Interactive category filters & 9 showcase projects with specs modal
├── contact.html            # Contact page: Contact channels, interactive map placeholder, and validatable form
│
├── css/
│   └── style.css           # Master stylesheet containing custom variables, styling, and animations
│
├── js/
│   └── script.js           # Master JavaScript controller (Active nav, form validation, counters, filter)
│
├── google-apps-script/
│   └── Code.gs             # Ready-to-deploy Google Apps Script doPost() email delivery script
│
├── images/
│   └── README.txt          # Documentation on demonstration images, dimensions, and replacement guides
│
├── robots.txt              # Production search crawler instructions
├── sitemap.xml             # XML sitemap for Google Search Console and SEO indexing
└── README.md               # Complete setup, customization, and deployment manual
```

---

## 3. How to Run Locally

You can preview the website immediately using any local web server or static server:

### Option A: Using Vite (Included)
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Option B: Using Python
If you have Python installed, navigate to the project directory in your terminal and run:
```bash
# Python 3
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option C: Using VS Code Live Server
1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click on `index.html` and select **"Open with Live Server"**.

---

## 4. How to Change Company Information

To rebrand or update contact details, update the centralized configuration variables:

### 1. In `js/script.js`:
Locate the `CONFIG` object at line 10:
```javascript
const CONFIG = {
  companyName: "ARTEEVA",
  companyEmail: "replace-with-company-email@example.com",
  phone: "+91 7305443860",
  address: "ARTEEVA Towers, Plot 42, Prime Industrial & Commercial Zone",
  location: "Kanyakumari District, Tamil Nadu, India",
  workingHours: "Monday - Saturday: 8:30 AM - 6:30 PM",
  appsScriptUrl: "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
};
```

### 2. In HTML Files (`index.html`, `about.html`, etc.):
Search and replace the demonstration placeholders:
* **Company Phone:** `+91 7305443860`
* **Company Email:** `arteeva.co@gmail.com`
* **Company Address:** `ARTEEVA Towers, Plot 42, Prime Industrial & Commercial Zone, Kanyakumari District, Tamil Nadu, India`
* **Operating Hours:** `Mon - Sat: 8:30 AM - 6:30 PM`

---

## 5. Google Apps Script Setup (Contact Form Email System)

The contact form is pre-configured to communicate directly with a **Google Apps Script Web App**. Submissions are packaged and routed straight to your company inbox without third-party email services.

### Step-by-Step Deployment Instructions:

1. **Open Google Apps Script:**
   Navigate to [https://script.google.com/](https://script.google.com/) and click **"New project"**.
2. **Name the Project:**
   Rename the project at the top to `"ARTEEVA Contact Form Handler"`.
3. **Copy Code:**
   Open the file `google-apps-script/Code.gs` in this repository, copy its entire contents, and paste it into the Apps Script editor (replacing any existing boilerplate).
4. **Configure Your Recipient Email:**
   At the top of the script, update:
   ```javascript
   const COMPANY_EMAIL = "your-actual-email@example.com";
   ```
5. **Deploy as a Web App:**
   - Click the blue **"Deploy"** button in the upper right, then choose **"New deployment"**.
   - Click the gear icon next to "Select type" and choose **"Web app"**.
   - Fill in:
     * **Description:** `ARTEEVA Contact Form v1`
     * **Execute as:** `Me (your-email@gmail.com)`
     * **Who has access:** `Anyone` *(Crucial: allows the contact form on your website to send enquiries)*.
   - Click **"Deploy"**.
6. **Authorize Access:**
   Google will prompt you to review permissions. Click **"Review permissions"**, choose your Google account, click **"Advanced"**, and select **"Go to ARTEEVA Contact Form Handler (unsafe)"** (standard for personal Apps Scripts), then click **"Allow"**.
7. **Copy Your Web App URL:**
   Google will display a URL in this format:
   `https://script.google.com/macros/s/AKfycb.../exec`
8. **Paste URL into Frontend:**
   Open `js/script.js` and paste your URL into `CONFIG.appsScriptUrl`:
   ```javascript
   appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec"
   ```
9. **Test the Form:**
   Go to `contact.html`, submit a test inquiry, and verify that the HTML notification email arrives in your inbox with all submitted parameters.

*(Note: When `CONFIG.appsScriptUrl` is empty, the website runs in high-fidelity demonstration mode, logging data to the browser console and displaying the success message).*

---

## 6. How to Replace Images

All images currently used are curated, high-definition architectural and construction assets from Unsplash.

To use your company's own project photos:
1. Optimize your photos (recommended format: `.webp` or `.jpg` at 80% quality, max width 1920px for hero, 800px for cards).
2. Save your photos into the `images/` directory (e.g. `images/project-skyline.jpg`).
3. In the respective HTML file, update the `src` attribute:
   ```html
   <!-- Change from: -->
   <img src="https://images.unsplash.com/..." alt="...">
   <!-- To: -->
   <img src="images/project-skyline.jpg" alt="ARTEEVA Skyline Commercial Center exterior facade" loading="lazy">
   ```
4. Always provide descriptive, accessible `alt` text and keep `loading="lazy"` on all images below the hero fold.

---

## 7. Search Engine Optimization (SEO) Setup

1. **Update Canonical Domain:**
   Search for `https://www.arteeva-construction.com/` in all HTML files and replace it with your registered production domain (e.g., `https://www.arteevabuilders.com/`).
2. **Update Sitemap & Robots:**
   - In `sitemap.xml`: replace `https://www.arteeva-construction.com/` with your live domain.
   - In `robots.txt`: update the `Sitemap:` directive with your live sitemap URL.
3. **Google Search Console:**
   Add your property in Google Search Console and submit `sitemap.xml` for indexation.
4. **Structured Data:**
   Each page includes tailored `BreadcrumbList`, `GeneralContractor`, or `Service` JSON-LD schema ready for rich snippets.

---

## 8. Deployment Options

### Deploying to Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop the entire `ARTEEVA` folder into the Netlify drop zone.
3. Your site is instantly live with free SSL.

### Deploying to Vercel
1. Install Vercel CLI (`npm i -g vercel`) or push your project to a GitHub repository.
2. Import the project into Vercel and select **"Other"** as the framework preset.
3. Click **"Deploy"**.

### Deploying to GitHub Pages
1. Push this folder to a GitHub repository.
2. In the repository, navigate to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/ (root)`.
4. Click **Save**. Your site will be published at `https://<username>.github.io/<repo-name>/`.

---

## 9. License & Attribution

Designed and engineered for **ARTEEVA Consultants & Contractors**.
All demonstration photography is sourced under the Unsplash free commercial license.
All project data, achievements, and client satisfaction percentages are demonstration examples customizable for official company proposals.
