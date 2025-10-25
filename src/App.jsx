// App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BookSession from "./components/BookSession";
import UniversityAdminDashboard from "./components/UniversityAdminDashboard";
import Doctors from "./components/Doctors";
import AdminStudentAppointments from "./components/AdminStudentAppointments";
import AssessmentPage from "./components/AssessmentPage";
import AdminDashboard from "./components/AdminDashboard";
import ApprovedAppointments from "./components/ApprovedAppointments";
import RejectedAppointments from "./components/RejectedAppointments";
import PendingAppointments from "./components/PendingAppointment";
import UniversitiesPage from "./components/UniversitiesPage";
import UniversityStudentsPage from "./components/UniversityStudentsPage";
import AssignDoctorsPage from "./components/AssignDoctorsPage";
import DoctorAppointments from "./components/DoctorAppointments";
import DoctorApprovedAppointments from "./components/DoctorApprovedAppointments";
import DoctorRejectedAppointments from "./components/DoctorRejectedAppointments";
import Reports from "./components/Reports";
import ReportDashboard from "./components/ReportDashboard"
import SessionsSummary from "./components/SessionsSummary";
import Profile from "./components/Profile"
import Resource from "./components/Resources";
import EmployeeDashboard from "./components/EmployeeDashboard";
import CompanyPage from "./components/ComapnyPage";
import AssignCompanyDoctorsPage from "./components/AssignCompanyDoctorsPage";
import BookEmployeeSession from "./components/BookEmployeeSession";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public route - Login / Signup */}
        <Route path="/" element={<EmployeeDashboard />} />

    

        <Route
          path="/assessments/:slug"
          element={
          
              <AssessmentPage />
            
          }
        />


        <Route
          path="/doctor/appointments"
          element={
          
              <DoctorAppointments />
    
          }
        />


        <Route path="/reports" element={<Reports />} />
        <Route path="/student-reports" element={<ReportDashboard />} />
        <Route path="/total-sessions" element={<SessionsSummary />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/admin/companies" element={<CompanyPage />} />
        <Route path="/companies/:companyId/assign-doctors" element={<AssignCompanyDoctorsPage />} />
        <Route path="/book-session-employee" element={<BookEmployeeSession />} />


      </Routes>
    </Router>
  );
}

export default App;
