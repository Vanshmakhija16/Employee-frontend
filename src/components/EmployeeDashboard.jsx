import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Calendar,
  BookOpen,
  Phone,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import minderyLogo from "../assets/mindery.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function EmployeeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
const [showQuestionnaire, setShowQuestionnaire] = useState(false);

const [questionnaireForm, setQuestionnaireForm] = useState({
  fullName: "",
  nickname: "",
  dob: "",
  gender: "",
  pronouns: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  education: "",
  occupation: "",
  industry: "",
  employmentStatus: "",
  languages: "",
  maritalStatus: "",
  children: "",
  interests: "",
  purpose: [],
  heardFrom: "",
});


useEffect(() => {
  const completed = localStorage.getItem("questionnaireCompleted");
  if (!completed) {
    setShowQuestionnaire(true);
  }
}, []);

const handleQuestionnaireChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox") {
    // For multi-select checkboxes (purpose)
    let newPurpose = [...questionnaireForm.purpose];
    if (checked) newPurpose.push(value);
    else newPurpose = newPurpose.filter((p) => p !== value);
    setQuestionnaireForm({ ...questionnaireForm, purpose: newPurpose });
  } else {
    setQuestionnaireForm({ ...questionnaireForm, [name]: value });
  }
};


const handleQuestionnaireSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    await axios.post(`${backend_url}/api/employee-questionnaire`, questionnaireForm, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem("questionnaireCompleted", "true"); 
    setShowQuestionnaire(false);
    alert("Thank you! Your answers have been saved.");
  } catch (err) {
    console.error(err);
    alert("Failed to save answers. Please try again.");
  }
};


  useEffect(() => {
    async function fetchAssessments() {
      try {
        const res = await axios.get(`${backend_url}/api/assessments`);
        setAssessments(res.data);
      } catch (err) {
        console.error("Error fetching assessments", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAssessments();
  }, []);

  // ===== SAMPLE DATA for Charts =====
  const barData = [
    { name: "Stress", score: 70 },
    { name: "Sleep", score: 85 },
    { name: "Focus", score: 60 },
    { name: "Happiness", score: 90 },
  ];

  const pieData = [
    { name: "Completed", value: 65 },
    { name: "Pending", value: 25 },
    { name: "In Progress", value: 10 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#facc15"];

  // ===== CHALLENGES =====
  const challenges = [
    {
      title: "Mindful Breaks",
      desc: "Take 5-minute breathing sessions during work hours.",
      color: "bg-blue-100",
    },
    {
      title: "Sleep Challenge",
      desc: "Maintain a sleep journal for 7 days.",
      color: "bg-green-100",
    },
    {
      title: "Digital Detox",
      desc: "Avoid screens 1 hour before bed.",
      color: "bg-pink-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col relative">
      {/* ===== NAVBAR ===== */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-xl shadow-md sticky top-0 z-30 border-b border-blue-100">
        {/* Left: Menu Icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:text-blue-600 transition z-50 relative"
          >
            {sidebarOpen ? (
              <X size={28} strokeWidth={2.5} />
            ) : (
              <Menu size={28} strokeWidth={2.5} />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={minderyLogo}
              alt="Mindery Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
              Mindery
            </h1>
          </div>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <button className="hover:text-blue-600 transition">Home</button>
          <button  onClick={() => navigate("/resources")} className="hover:text-blue-600 transition">Resources</button>
          <button
            className="hover:text-blue-600"
            onClick={() => navigate("/book-session-employee")}
          >
            Book Session
          </button>
          <button className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition">
            <Phone size={18} /> Call Us
          </button>
        </div>

        {/* Right: Login */}
        <button
          onClick={() => navigate("/employee-login")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Login
        </button>
      </nav>

      {/* ===== SIDEBAR (Mobile) ===== */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80 }}
            className="fixed top-0 left-0 w-64 h-full bg-white/90 backdrop-blur-xl shadow-2xl z-40 flex flex-col"
          >
            <div className="flex justify-between items-center px-5 py-4 border-b border-blue-100">
              <h2 className="text-lg font-bold text-blue-700">Mindery</h2>
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 px-5 py-6 flex flex-col gap-5 text-gray-700 font-medium">
              <SidebarItem icon={<User />} text="Profile" />
              <SidebarItem icon={<Home />} text="Dashboard" active />
              <SidebarItem icon={<Calendar />} text="Session Booking" />
              <SidebarItem icon={<BookOpen />} text="Resources" />
            </nav>

            <div className="mt-auto px-5 py-4 border-t border-blue-100">
              <button className="flex items-center gap-3 text-red-500 hover:text-red-600 font-semibold transition">
                <LogOut size={20} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 flex flex-col items-center text-center mt-12 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
        >
          Welcome to Your Company Dashboard
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mb-8 leading-relaxed"
        >
          View your company’s assigned doctors, manage session bookings, and
          explore curated mental health resources.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button  onClick={() => navigate("/book-session-employee")} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition">
            View Assigned Doctors
          </button>
          <button  onClick={() => navigate("/resources")} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition">
            Explore Resources
          </button>
        </motion.div>


                {/* ===== MAIN IMAGE ===== */}
        <motion.img
          src="https://imgs.search.brave.com/V6J2AMC1skmBdrlg-xCsqF9EdW_fiFlmRRcW0cG_XBs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHJhdmVsb3Byby5j/b20vcHVibGljL2lt/YWdlcy9jb250ZW50/cy9vbmxpbmUtYm9v/a2luZy1wb3J0YWxz/Mi5qcGc"
          alt="Mindery Dashboard Illustration"
          className="mt-14 w-full max-w-5xl rounded-3xl shadow-2xl border border-blue-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        {/* ===== ASSESSMENTS SECTION ===== */}
        <section className="py-14 w-full text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-3">
            🧠 Assessments
          </h3>
          <p className="text-gray-600 mb-8">
            Explore wellbeing assessments curated for you.
          </p>

          {loading ? (
            <p className="text-gray-500">Loading assessments...</p>
          ) : (
            <div className="flex overflow-x-auto no-scrollbar space-x-6 px-4 justify-center">
              {assessments.map((a, i) => {
                const colors = [
                  "bg-blue-100",
                  "bg-green-100",
                  "bg-pink-100",
                  "bg-purple-100",
                  "bg-yellow-100",
                ];
                return (
                  <div
                    key={a.slug}
                    onClick={() => navigate(`/assessments/${a.slug}`)}
                    className={`${colors[i % colors.length]} shadow-md hover:shadow-lg p-4 rounded-xl w-[220px] flex-shrink-0 text-left cursor-pointer transition-transform hover:scale-[1.03]`}
                  >
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {a.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {a.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>



      </main>
{showQuestionnaire && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Employee Questionnaire</h2>
      <p className="text-center text-gray-600 mb-6">
        Please fill out this questionnaire. It helps us personalize your experience.
      </p>

      <form onSubmit={handleQuestionnaireSubmit} className="space-y-6">
        {/* ===== Section 1: Basic Info ===== */}
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Section 1: Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" name="fullName" placeholder="Full Name" value={questionnaireForm.fullName} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" required />
            <input type="text" name="nickname" placeholder="Preferred Name / Nickname" value={questionnaireForm.nickname} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
            <input type="date" name="dob" value={questionnaireForm.dob} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" required />
            <select name="gender" value={questionnaireForm.gender} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary / Third gender</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
            <select name="pronouns" value={questionnaireForm.pronouns} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded">
              <option value="">Select Pronouns</option>
              <option value="he/him">He/Him</option>
              <option value="she/her">She/Her</option>
              <option value="they/them">They/Them</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
            <input type="text" name="pronounsCustom" placeholder="Custom Pronouns" value={questionnaireForm.pronounsCustom} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        {/* ===== Section 2: Contact & Location ===== */}
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Section 2: Contact & Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="email" name="email" placeholder="Email Address" value={questionnaireForm.email} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" required />
            <input type="text" name="phone" placeholder="Phone Number" value={questionnaireForm.phone} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
            <input type="text" name="country" placeholder="Country" value={questionnaireForm.country} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
            <input type="text" name="city" placeholder="City / State" value={questionnaireForm.city} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        {/* ===== Section 3: Education & Occupation ===== */}
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Section 3: Education & Occupation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select name="education" value={questionnaireForm.education} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded">
              <option value="">Highest Level of Education</option>
              <option value="highschool">High School or equivalent</option>
              <option value="undergraduate">Undergraduate / College</option>
              <option value="postgraduate">Postgraduate / Masters</option>
              <option value="doctorate">Doctorate / PhD</option>
              <option value="other">Other</option>
            </select>
            <input type="text" name="occupation" placeholder="Current Occupation / Profession" value={questionnaireForm.occupation} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
            <input type="text" name="industry" placeholder="Industry / Field" value={questionnaireForm.industry} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
            <select name="employmentStatus" value={questionnaireForm.employmentStatus} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded">
              <option value="">Employment Status</option>
              <option value="full-time">Employed full-time</option>
              <option value="part-time">Employed part-time</option>
              <option value="student">Student</option>
              <option value="self-employed">Self-employed / Freelancer</option>
              <option value="unemployed">Unemployed</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        {/* ===== Section 4: Lifestyle & Interests ===== */}
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-2">Section 4: Lifestyle & Interests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" name="languages" placeholder="Languages Spoken" value={questionnaireForm.languages} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
            <select name="maritalStatus" value={questionnaireForm.maritalStatus} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded">
              <option value="">Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married / Partnered</option>
              <option value="divorced">Divorced / Separated</option>
              <option value="widowed">Widowed</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
            <select name="children" value={questionnaireForm.children} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded">
              <option value="">Do you have children?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <input type="text" name="interests" placeholder="Interests / Hobbies" value={questionnaireForm.interests} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        {/* ===== Section 5: Website-Specific / Customization ===== */}
        <div className="pb-4">
          <h3 className="font-semibold mb-2">Section 5: Website-Specific / Customization</h3>
          <p className="mb-2 font-medium">What brings you here today?</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Learn / explore","Improve lifestyle / health","Personal growth / self-help","Networking / community","Other"].map((p) => (
              <label key={p} className="flex items-center gap-1">
                <input type="checkbox" name="purpose" value={p} onChange={handleQuestionnaireChange} />
                {p}
              </label>
            ))}
          </div>
          <select name="heardFrom" value={questionnaireForm.heardFrom} onChange={handleQuestionnaireChange} className="w-full border p-2 rounded">
            <option value="">How did you hear about us?</option>
            <option value="social-media">Social media</option>
            <option value="friend">Friend / referral</option>
            <option value="search">Search engine</option>
            <option value="advertisement">Advertisement</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2">Submit</button>
      </form>
    </div>
  </div>
)}



    </div>
  );
}

// ===== Sidebar Component =====
const SidebarItem = ({ icon, text, active }) => (
  <button
    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
      active
        ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
        : "hover:bg-blue-50 hover:text-blue-600"
    }`}
  >
    <span className="text-blue-600">{icon}</span> {text}
  </button>
);
