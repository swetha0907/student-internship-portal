import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { internships } from "../App";

function ApplicationForm() {

    const { id } = useParams();

    const internship = internships.find(
        (item) => item.id === Number(id)
    );

    const [formData, setFormData] = useState({
        studentName: "",
        email: "",
        rollNumber: "",
        internship: internship?.title || ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.studentName.trim() ||
            !formData.email.trim() ||
            !formData.rollNumber.trim()
        ) {
            setError("Please fill all fields");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!internship) {
            setError("Invalid internship selection");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch("/api/applications", 
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                     },

                      body: JSON.stringify(formData)
                });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Application failed");
            }

            setMessage(result.message);

            setFormData({
                studentName: "",
                email: "",
                rollNumber: "",
                internship: internship.title
            });

        } catch (err) {

            setError(
                err.message || "Unable to submit application"
            );

        } finally {

            setLoading(false);

        }
    }

    if (!internship) {
        return <h2>Internship not found</h2>;
    }

    return (

        <div className="container">

            <div className="form-card">

                <h1>Internship Application</h1>

                <h3>{internship.title}</h3>

                <form onSubmit={handleSubmit}>

                    <label>Student Name</label>

                    <input
                        type="text"
                        name="studentName"
                        placeholder="Enter your full name"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email ID</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Roll Number</label>

                    <input
                        type="text"
                        name="rollNumber"
                        placeholder="Enter your roll number"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        required
                    />

                    <label>Selected Internship</label>

                    <input
                        type="text"
                        value={formData.internship}
                        readOnly
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>

                </form>

                {message && (
                    <p className="success">{message}</p>
                )}

                {error && (
                    <p className="error">{error}</p>
                )}

                <Link to={`/internship/${id}`}>
                    Back to Details
                </Link>

            </div>

        </div>

    );
}

export default ApplicationForm;