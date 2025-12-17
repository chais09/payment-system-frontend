import { useState } from "react";
import api from "../api/api";

function BalanceActionForm({
    accountId,
    action, // "deposit" or "withdraw"
    onSuccess,
}) {
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await api.post(`/api/v1/accounts/${accountId}/${action}`, {
                amount: Number(amount),
            });

            setAmount("");
            onSuccess();
        } catch (err) {
            setError(
                err.response?.data?.message || "Operation failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "8px" }}>
            <input
                type="number"
                step="0.01"
                placeholder={`${action} amount`}
                value={amount}
                min="0.00"
                onChange={(e) => setAmount(e.target.value)}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? "Processing..." : action}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

export default BalanceActionForm;
