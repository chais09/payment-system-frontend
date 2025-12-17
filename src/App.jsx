import { useState } from "react";
import AccountList from "./components/AccountList";
import CreateAccountForm from "./components/CreateAccountForm";
import TransferForm from "./components/TransferForm";
import TransactionList from "./components/TransactionList";


function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const refresh = () => setRefreshKey((k) => k + 1);

  return (
    <div className="app">
      <h1>Payments Webpage</h1>

      <div className="grid">
        <div className="card">
          <CreateAccountForm onCreated={refresh} />
        </div>

        <div className="card">
          <TransferForm
            onTransferSuccess={refresh}
            refreshKey={refreshKey}
          />
        </div>

        <div className="card full-width">
          <AccountList
            refreshKey={refreshKey}
            onSelectAccount={setSelectedAccountId}
            selectedAccountId={selectedAccountId}
            onRefresh={refresh}

          />
        </div>

        <div className="card full-width">
          <TransactionList
            accountId={selectedAccountId}
            refreshKey={refreshKey}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
