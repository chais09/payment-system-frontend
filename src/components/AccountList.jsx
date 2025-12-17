import { useEffect, useState } from "react";
import api from "../api/api";

function AccountList(props) {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    let refreshKey = props.refreshKey;
    const onSelectAccount = props.onSelectAccount;

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
                    <li
                        key={acc.id}
                        onClick={() => onSelectAccount(acc.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {acc.ownerName} — {acc.currency} — {acc.balance}
                    </li>

                ))}
            </ul>
        </div>
    );
}

export default AccountList;
