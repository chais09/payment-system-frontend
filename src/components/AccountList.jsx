import { useEffect, useState } from "react";
import BalanceActionForm from "./BalanceActionForm";
import api from "../api/api";

function AccountList({ refreshKey, onSelectAccount, onRefresh, selectedAccountId }) {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/api/v1/accounts")
            .then((res) => setAccounts(res.data))
            .catch(() => setError("Failed to load accounts"));
    }, [refreshKey]);

    const handleDelete = async (accountId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this account?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/api/v1/accounts/${accountId}`);
            onRefresh();
        } catch (err) {
            alert(
                err.response?.data?.message || "Failed to delete account"
            );
        }
    };

    return (
        <div>
            <h2>Accounts</h2>

            {error && <p className="error">{error}</p>}

            <ul>
                {accounts.map((acc) => (
                    <li key={acc.id}
                        className={`account-item ${selectedAccountId === acc.id ? "selected" : ""
                            }`}
                        onClick={() => onSelectAccount(acc.id)}>
                        <div className="account-header">
                            <span>{acc.ownerName} ({acc.currency})</span>
                            <span>{acc.balance}</span>
                        </div>

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

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(acc.id);
                            }}
                        >
                            Delete Account
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountList;
