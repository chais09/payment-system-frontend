import { useEffect, useState } from "react";
import api from "../api/api";

function TransactionList({ accountId, refreshKey }) {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!accountId) {
            setTransactions([]);
            return;
        }

        api.get(`/api/v1/accounts/${accountId}/transactions`)
            .then((res) => setTransactions(res.data))
            .catch(() => setError("Failed to load transactions"));
    }, [accountId, refreshKey]);

    if (!accountId) {
        return <p>Select an account to view transactions</p>;
    }

    return (
        <div>
            <h3>Transaction History</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <table border="1" cellPadding="6">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance Before</th>
                        <th>Balance After</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx.id}>
                            <td>{tx.type}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.balanceBefore}</td>
                            <td>{tx.balanceAfter}</td>
                            <td>{new Date(tx.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionList;
