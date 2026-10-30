import { Link, useParams } from "react-router-dom";
import { internships } from "../App";

function InternshipDetails() {

    const { id } = useParams();

    const internship = internships.find(
        (item) => item.id === Number(id)
    );

    if (!internship) {
        return (
            <div className="container">
                <h2>Internship not found</h2>
                <Link to="/">Go Back</Link>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="details-card">

                <h1>{internship.title}</h1>

                <h3>{internship.company}</h3>

                <p>{internship.description}</p>

                <p>
                    <strong>Duration:</strong> {internship.duration}
                </p>

                <p>
                    <strong>Stipend:</strong> {internship.stipend}
                </p>

                <Link
                    className="btn"
                    to={`/apply/${internship.id}`}
                >
                    Apply Now
                </Link>

                <br />

                <Link to="/">Back to Internship List</Link>

            </div>
        </div>
    );
}

export default InternshipDetails;