# 🚂 BLW Employee Nexus Hub

Welcome to the **BLW Employee Nexus Hub**, a full-stack employee management platform developed for **Banaras Locomotive Works (BLW)** – an Indian Railway locomotive manufacturing and repair hub. This web application streamlines employee management, administrative control, and department-level workflows within a secure and responsive interface.

---

## 📌 Key Features

### 🧑‍💼 Employee Panel
- ✅ Secure Login/Signup (via Supabase Auth)
- 👤 View and update personal details
- 📄 Download payslips, work reports, and notices
- 📝 Submit leave requests and feedback
- 🧾 Upload documents (Aadhaar, PAN, etc.)

### 🔐 Admin Panel
- 🧑‍💻 Super admin access (secured by role-based auth)
- 🔍 View, add, edit & delete employee records
- 📊 Admin Dashboard with employee statistics
- 📤 Upload official circulars and documents
- 🧾 Manage department-specific tasks & reports

### 🧰 Department Tools
- 🚧 Repair Logs for workshop engineers
- 📆 Shift Management System
- 📋 Attendance Tracker
- 🔄 Transfer Requests between departments

### 🌐 General
- 💾 Supabase as the backend (PostgreSQL + Auth + Storage)
- 🧱 Modular and scalable architecture
- 📱 Fully responsive (Mobile + Desktop)
- 🧭 Navigation bar with multi-section routing

---

## 🔧 Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Frontend     | React.js, Tailwind CSS |
| Backend      | Supabase (Auth, DB, Storage) |
| Hosting      | Vercel / Netlify     |
| Database     | PostgreSQL (via Supabase) |
| State Mgmt   | React Hooks / Context API |
| Auth         | Supabase Auth        |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blw-employee-nexus-hub.git
cd blw-employee-nexus-hub
```

2. Install Dependencies
```bash
npm install
```

3. Setup Supabase
```bash
Create a project at https://supabase.com

Copy your anon/public keys and project URL

Create tables: employees, departments, attendance, notices, etc.

Enable Supabase Auth (Email + Password)


Update the .env file:

REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```
4. Run Locally
```bash
npm start

```
---

🧪 Folder Structure
```bash
📁 src
├── 📁 components
├── 📁 pages
├── 📁 services
├── 📁 context
├── 📁 utils
├── App.js
└── index.js
```

---

✅ Future Enhancements

🔔 Real-time notifications

🛠️ Repair ticketing system

🗣️ Internal chat between departments

📱 Android/iOS app version

🧠 AI-powered performance analysis



---

🙌 Contributing

Contributions, issues, and feature requests are welcome!

How to Contribute:

1. Fork the repository


2. Create a new branch (feature/YourFeature)


3. Commit your changes


4. Push to the branch


5. Open a Pull Request




---

📄 License

This project is licensed under the MIT License.


---

✉️ Contact

Developer: Shivesh Tiwari and Anurag Gupta

Email: nikutiwari70@gmail.com & anusingh94151158@gmail.com

LinkedIn: https://www.linkedin.com/in/shivesh-tiwari-68b79a245 & 
https://www.linkedin.com/in/anurag-gupta-baba-94a136325


---

🚀 BLW Employee Nexus Hub – Powering the workforce behind the locomotives of India.
