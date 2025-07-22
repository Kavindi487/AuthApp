import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store error message
    const [success, setSuccess] = useState(""); // State to store success message
    const [loading, setLoading] = useState(false); // State to manage loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while waiting for response
        setError(""); // Clear any previous errors
        setSuccess(""); // Clear any previous success messages

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register", {
                name,
                email,
                password,
            });

            console.log("Response:", response.data); // Log the response to check success

            // Handle success response: display the success message and handle further actions
            setSuccess("Registration successful! Please log in.");
        } catch (err) {
            setLoading(false); // Set loading to false when the request is done
            if (err.response) {
                console.error("Error response:", err.response); // Log the full response

                // Check if there are validation errors
                if (err.response.data.errors) {
                    setError(err.response.data.errors.email || "Registration failed. Please try again.");
                } else {
                    setError(err.response.data.message || "Registration failed");
                }
            } else {
                setError("Something went wrong.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-10 col-lg-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </form>

                            {/* Display error or success messages */}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {success && <div className="alert alert-success mt-3">{success}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};