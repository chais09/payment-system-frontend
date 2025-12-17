import { useState } from "react";
import api from "../api/api";

function CreateAccountForm(props) {
    const [ownerName, setOwnerName] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let onCreated = props.onCreated;
    let refreshKey = props.refreshKey;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await api.post("/api/v1/accounts", {
                ownerName,
                currency,
            });

            setOwnerName("");
            setCurrency("USD");
            onCreated(); // tell parent to refresh
        } catch (err) {
            setError("Failed to create account");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Account</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Owner name"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                />

                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}

export default CreateAccountForm;
