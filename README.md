# Document Scanner & Matching System with Credit Limits

A full-stack application for uploading, scanning, and matching documents with a built-in credit system and admin control. Each user gets 20 free scans per day; additional credits must be requested and approved by an admin.

---

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js (Express) — no third-party libraries
- **Database**: JSON file-based local storage
- **Storage**: Local filesystem for uploaded documents
- **Authentication**: Basic username-password (hashed)
- **Text Matching**: Levenshtein distance, word frequency, custom logic
- **Bonus**: Optional AI-powered similarity (OpenAI, Gemini, DeepSeek)

---

## 🚀 Features

### 👤 User Management
- Register/login with secure credentials
- Role-based access: User & Admin
- Profile shows credits, scans, and request history

### 💳 Credit System
- 20 free credits reset daily at midnight
- Each scan deducts 1 credit
- Users can request more credits
- Admin can approve or deny credit requests

### 📄 Document Scanning & Matching
- Upload `.txt` files
- Basic text similarity matching
- Bonus: AI-enhanced semantic similarity

### 📊 Smart Admin Dashboard
- Scan analytics by user/date/topic
- Track credit usage
- Approve/deny requests from UI (optional)

---

## 📁 Folder Structure

```

document-scanner-credit-system/
├── backend/
│   ├── config.json
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── controllers/
│   ├── credit/
│   │   └── request/
│   ├── database/
│   │   ├── credit\_requests.json
│   │   ├── documents.json
│   │   ├── scans.json
│   │   ├── sessions.json
│   │   └── users.json
│   ├── middleware/
│   │   └── creditReset.js
│   ├── models/
│   │   └── database.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── analytics.js
│   │   ├── auth.js
│   │   ├── creditRequests.js
│   │   ├── matches.js
│   │   └── scan.js
│   ├── uploads/
│   │   ├── \[doc1.txt, doc2.txt, ...]
│   └── utils/
│       ├── analytics.js
│       ├── analyticsHelpers.js
│       ├── resetCredits.js
│       └── textMatching.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md

````

---

## 📡 API Endpoints

| Method | Endpoint               | Description                              |
|--------|------------------------|------------------------------------------|
| POST   | `/auth/register`       | Register a new user                      |
| POST   | `/auth/login`          | Log in with username/password            |
| GET    | `/user/profile`        | Get profile info & current credit count  |
| POST   | `/scan`                | Upload a document and scan               |
| GET    | `/matches/:docId`      | Fetch similar documents                  |
| POST   | `/credits/request`     | Request more scan credits                |
| GET    | `/admin/analytics`     | Admin dashboard: usage stats             |

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/document-scanner-credit-system.git
cd document-scanner-credit-system
````

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Start the backend server

```bash
node server.js
```

### 4. Launch frontend

Open `frontend/index.html` in your browser, OR use a local server:

```bash
npx http-server frontend
```

## ✅ Submission Checklist

* [x] Fully functional backend & frontend
* [x] Credit system implemented
* [x] Text matching logic in place
* [x] README with setup instructions
* [x] Bonus AI integration (if implemented)
* [x] Sample documents for testing
* [x] Optional screenshots/demo video

---

## 📸 Screenshots (Optional)

comming soon

---

## 🛡️ License

MIT License. Code is original and written for educational use. No external code was copied.

---

**Built with 💙 by VIVEK HARSH**

