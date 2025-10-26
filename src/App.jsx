// App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AssessmentPage from "./components/AssessmentPage";

import Reports from "./components/Reports";
import ReportDashboard from "./components/ReportDashboard"
import Profile from "./components/Profile"
import Resource from "./components/Resources";
import EmployeeDashboard from "./components/EmployeeDashboard";
import CompanyPage from "./components/ComapnyPage";
// import AssignCompanyDoctorsPage from "./components/AssignCompanyDoctorsPage";
import BookEmployeeSession from "./components/BookEmployeeSession";
import LoginEmployee from "./components/LoginEmployee";
import SignupEmployee from "./components/SignupEmployee";
function App() {
    const isLoggedIn = !!localStorage.getItem("token"); // check if token exists

  return (
    <Router>

      <Routes>
        <Route path="/employee-login" element={<LoginEmployee />} />
        <Route path="/employee-signup" element={<SignupEmployee />} />

        <Route path="/" element={<EmployeeDashboard />} />


        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Profile />
            </ProtectedRoute>
          }
        />





        <Route
          path="/assessments/:slug"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <AssessmentPage />
            </ProtectedRoute>
          }
        />




        

    
       
        <Route path="/reports" element={<Reports />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin/companies" element={<CompanyPage />} />
        {/* <Route path="/companies/:companyId/assign-doctors" element={<AssignCompanyDoctorsPage />} /> */}
<Route
  path="/book-session-employee"
  element={
    <ProtectedRoute>
      <BookEmployeeSession />
    </ProtectedRoute>
  }
/>


      </Routes>
    </Router>
  );
}

export default App;
