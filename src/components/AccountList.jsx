import { useEffect, useState } from "react";
import BalanceActionForm from "./BalanceActionForm";
import api from "../api/api";

function AccountList({ refreshKey, onSelectAccount, onRefresh }) {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/api/v1/accounts")
            .then((res) => setAccounts(res.data))
            .catch(() => setError("Failed to load accounts"));
    }, [refreshKey]);

    return (
        <div>
            <h2>Accounts</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {accounts.map((acc) => (
                    <li key={acc.id}>
                        <strong>
                            {acc.ownerName} — {acc.currency} — {acc.balance}
                        </strong>

                        <BalanceActionForm
                            accountId={acc.id}
                            action="deposit"
                            onSuccess={onRefresh}
                        />

                        <BalanceActionForm
                            accountId={acc.id}
                            action="withdraw"
                            onSuccess={onRefresh}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountList;
