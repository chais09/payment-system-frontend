import { useState, useEffect } from "react";
import api from "../api/api";

function TransferForm(props) {
    const [accounts, setAccounts] = useState([]);
    const [fromAccountId, setFromAccountId] = useState("");
    const [toAccountId, setToAccountId] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let onTransferSuccess = props.onTransferSuccess;
    let refreshKey = props.refreshKey;

    // Load accounts for dropdowns
    useEffect(() => {
        api.get("/api/v1/accounts")
            .then((res) => setAccounts(res.data))
            .catch(() => setError("Failed to load accounts"));
    }, [refreshKey]);

    const generateIdempotencyKey = () => {
        return crypto.randomUUID();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await api.post(
                "/api/v1/transfers",
                {
                    fromAccountId: Number(fromAccountId),
                    toAccountId: Number(toAccountId),
                    amount: Number(amount),
                    currency: "USD",
                },
                {
                    headers: {
                        "Idempotency-Key": generateIdempotencyKey(),
                    },
                }
            );

            setFromAccountId("");
            setToAccountId("");
            setAmount("");

            onTransferSuccess();
        } catch (err) {
            setError(
                err.response?.data?.message || "Transfer failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Transfer</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <select
                    value={fromAccountId}
                    onChange={(e) => setFromAccountId(e.target.value)}
                    required
                >
                    <option value="">From account</option>
                    {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                            {acc.ownerName} ({acc.currency}) — {acc.balance}
                        </option>
                    ))}
                </select>

                <select
                    value={toAccountId}
                    onChange={(e) => setToAccountId(e.target.value)}
                    required
                >
                    <option value="">To account</option>
                    {accounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                            {acc.ownerName} ({acc.currency})
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Transferring..." : "Transfer"}
                </button>
            </form>
        </div>
    );
}

export default TransferForm;
