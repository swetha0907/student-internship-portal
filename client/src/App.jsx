import { Routes, Route } from "react-router-dom";

import InternshipList from "./pages/InternshipList";
import InternshipDetails from "./pages/InternshipDetails";
import ApplicationForm from "./pages/ApplicationForm";

export const internships = [
    {
        id: 1,
        title: "React Developer Intern",
        company: "Tech Solutions",
        duration: "3 Months",
        stipend: "₹8,000/month",
        description: "Develop modern user interfaces using React."
    },
    {
        id: 2,
        title: "Python Developer Intern",
        company: "Code Labs",
        duration: "6 Months",
        stipend: "₹10,000/month",
        description: "Build backend applications using Python."
    },
    {
        id: 3,
        title: "Data Analyst Intern",
        company: "Data Insights",
        duration: "3 Months",
        stipend: "₹7,000/month",
        description: "Analyze datasets and generate useful reports."
    },
    {
        id: 4,
        title: "Full Stack Developer Intern",
        company: "Web Innovations",
        duration: "4 Months",
        stipend: "₹12,000/month",
        description: "Develop complete web applications."
    }
];

function App() {
    return (
        <Routes>
            <Route path="/" element={<InternshipList />} />

            <Route
                path="/internship/:id"
                element={<InternshipDetails />}
            />

            <Route
                path="/apply/:id"
                element={<ApplicationForm />}
            />
        </Routes>
    );
}

export default App;