# Document Scanner & Matching System with Credit Limits

A full-stack application for uploading, scanning, and matching documents with a built-in credit system and admin control. Each user gets 20 free scans per day; additional credits must be requested and approved by an admin.

---

## 🔧 Tech Stack

* **Frontend**: HTML, CSS, JavaScript (Vanilla)
* **Backend**: Node.js (Express)
* **Database**: MongoDB (Mongoose ODM)
* **Storage**: Local filesystem for uploaded documents (optional), with in-memory uploads for scanning
* **Authentication**: JWT-based with hashed passwords (bcryptjs)
* **OCR**: Tesseract.js for images
* **Text Extraction**: Direct text extraction for `.txt` files
* **PDF Support**: *Not currently supported* (can be added later)
* **Text Matching**: Levenshtein distance, word frequency, custom logic
* **Bonus**: Optional AI-powered similarity (OpenAI, Gemini, DeepSeek)

---

## 🚀 Features

### 👤 User Management

* Register/login with secure credentials
* Role-based access: User & Admin
* Profile shows credits, scans, and request history

### 💳 Credit System

* 20 free credits reset daily at midnight
* Each scan deducts 1 credit
* Users can request more credits
* Admin can approve or deny credit requests

### 📄 Document Scanning & Matching

* Upload images (`.jpg`, `.png`, `.jpeg`) and `.txt` files for OCR and text extraction
* PDF scanning is *not* supported currently (will throw an error if uploaded)
* Basic text similarity matching
* Bonus: AI-enhanced semantic similarity (optional)

### 📊 Smart Admin Dashboard

* Scan analytics by user/date/topic
* Track credit usage
* Approve/deny credit requests via UI (optional)

---

## 📁 Folder Structure

```
client/
├─ public/
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ logo192.png
│  ├─ logo512.png
│  ├─ manifest.json
│  └─ robots.txt
├─ src/
│  ├─ components/
│  │  ├─ Home.css
│  │  ├─ Home.js
│  │  ├─ Login.css
│  │  ├─ Login.js
│  │  ├─ ScanUpload.css
│  │  ├─ ScanUpload.js
│  │  ├─ Signup.css
│  │  └─ Signup.js
│  ├─ App.css
│  ├─ App.js
│  ├─ App.test.js
│  ├─ index.css
│  ├─ index.js
│  ├─ logo.svg
│  ├─ reportWebVitals.js
│  └─ setupTests.js
backend/
├─ models/
│  ├─ User.js
│  └─ ScannedDocument.js
├─ middleware/
│  ├─ authMiddleware.js
├─ routes/
│  ├─ authRoutes.js
│  ├─ scanRoutes.js
│  ├─ adminRoutes.js
├─ index.js
├─ package.json
└─ README.md
```

---

## 📡 API Endpoints

| Method | Endpoint           | Description                             |
| ------ | ------------------ | --------------------------------------- |
| POST   | `/auth/register`   | Register a new user                     |
| POST   | `/auth/login`      | Log in with username/password           |
| GET    | `/user/profile`    | Get profile info & current credit count |
| POST   | `/scan`            | Upload an image or text file and scan   |
| GET    | `/matches/:docId`  | Fetch similar documents                 |
| POST   | `/credits/request` | Request more scan credits               |
| GET    | `/admin/analytics` | Admin dashboard: usage stats            |

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/document-scanner-credit-system.git
cd document-scanner-credit-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create a `.env` file with your environment variables

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Start the backend server

```bash
npm run dev
# or
node index.js
```

### 5. Launch frontend

Open `client/public/index.html` in your browser or run a local server:

```bash
npx http-server client/public
```

---

## ✅ Submission Checklist

* [x] Fully functional backend & frontend
* [x] Credit system implemented
* [x] Image and text file scanning supported
* [x] Text matching logic in place
* [x] README with setup instructions
* [x] Optional AI integration for matching
* [x] Sample documents for testing
* [ ] PDF support (future enhancement)
* [ ] Admin UI for credit approvals

---

## 🛡️ License

MIT License. Code is original and written for educational use.

---

**Built with 💙 by VIVEK HARSH**

---
