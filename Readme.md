frontend/
├── package.json
├── vite.config.js          # or CRA config
├── public/
│   └── index.html
└── src/
    ├── main.jsx            # React DOM render(root)
    ├── App.jsx             # Layout + wraps router + context
    ├── index.css           # global CSS (responsive layout, base styles)
    │
    ├── /routes
    │   └── AppRouter.jsx   # all routes defined here
    │
    ├── /firebase
    │   └── firebaseClient.js   # Firebase config & initialization
    │
    ├── /context
    │   └── AuthContext.jsx     # user, role, token, login/logout
    │
    ├── /services
    │   ├── api.js              # base fetch wrapper (adds Authorization header)
    │   └── hrmsService.js      # functions for employee, attendance, etc.
    │
    ├── /components
    │   ├── layout/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── Layout.jsx      # main shell: sidebar + topbar + outlet
    │   ├── common/
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── RoleGuard.jsx       # optional: guard UI parts by role
    │   │   ├── Loader.jsx
    │   │   └── StatCard.jsx       # small cards for dashboard stats
    │   └── components.css
    │
    ├── /pages
    │   ├── auth/
    │   │   ├── Login.jsx
    │   │   └── Register.jsx       # optional, or admin-only creation
    │   │
    │   ├── dashboard/
    │   │   ├── DashboardAdmin.jsx
    │   │   ├── DashboardSeniorManager.jsx
    │   │   ├── DashboardHRRecruiter.jsx
    │   │   ├── DashboardEmployee.jsx
    │   │   └── Dashboard.css
    │   │
    │   ├── employee/
    │   │   ├── MyProfile.jsx
    │   │   ├── MyAttendance.jsx
    │   │   └── MyPayroll.jsx
    │   │
    │   ├── hr/
    │   │   ├── JobsList.jsx
    │   │   ├── ApplicationsList.jsx
    │   │   └── ResumeScreeningAI.jsx       # future: AI module UI
    │   │
    │   ├── admin/
    │   │   ├── ManageUsers.jsx
    │   │   ├── CompanyOverview.jsx
    │   │   └── PerformanceOverview.jsx
    │   │
    │   ├── misc/
    │   │   ├── NotAuthorized.jsx
    │   │   ├── NotFound.jsx
    │   │   └── Landing.jsx                 # optional landing/home
    │   └── misc.css
    │
    ├── /hooks
    │   ├── useAuth.js           # wrapper around AuthContext
    │   └── useProtectedApi.js   # optional: always send token, handle 401
    │
    ├── /utils
    │   ├── roles.js             # { ADMIN, SENIOR_MANAGER, ... }
    │   └── storage.js           # localStorage helpers
    │
    └── /assets
        ├── logo.svg
        └── illustrations, icons etc.



backend/
├── app.js
├── server.js
├── package.json
├── .env              # your real env (not committed)
├── .env.example      # sample env
│
├── config/
│   ├── db.js
│   └── firebase.js
│
├── models/
│   ├── User.js
│   ├── Employee.js
│   ├── Attendance.js
│   ├── Job.js
│   └── Application.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── adminRoutes.js
│   ├── managerRoutes.js
│   ├── hrRoutes.js
│   └── employeeRoutes.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── adminController.js
│   ├── managerController.js
│   ├── hrController.js
│   └── employeeController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
└── utils/
    ├── constants.js
    └── logger.js        # optional, can be simple console wrapper for now
///////////////////////////////////////////////////////////////

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSPTSIFj4EkBG3MZ9iXQ5Nm-W21mVyvWI",
  authDomain: "hrmsdb-007.firebaseapp.com",
  projectId: "hrmsdb-007",
  storageBucket: "hrmsdb-007.firebasestorage.app",
  messagingSenderId: "151753403640",
  appId: "1:151753403640:web:e3ae51a79dad99ccb4df0d",
  measurementId: "G-0RNZBSBVBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

///////////////////////////////////////////////////////////////////////