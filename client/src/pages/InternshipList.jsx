import { Link } from "react-router-dom";
import { internships } from "../App";

function InternshipList() {
    return (
        <div className="container">

            <header>
                <h1>Student Internship Portal</h1>
                <p>Find your next learning opportunity</p>
            </header>

            <h2>Available Internships</h2>

            <div className="internship-grid">

                {internships.map((item) => (
                    <div className="card" key={item.id}>

                        <h3>{item.title}</h3>

                        <p>
                            <strong>Company:</strong> {item.company}
                        </p>

                        <p>
                            <strong>Duration:</strong> {item.duration}
                        </p>

                        <p>
                            <strong>Stipend:</strong> {item.stipend}
                        </p>

                        <Link
                            className="btn"
                            to={`/internship/${item.id}`}
                        >
                            View Details
                        </Link>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default InternshipList;