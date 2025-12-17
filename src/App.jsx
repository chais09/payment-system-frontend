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
    <div>
      <h1>Wise Payments</h1>

      <CreateAccountForm onCreated={refresh} />

      <TransferForm
        onTransferSuccess={refresh}
        refreshKey={refreshKey}
      />

      <AccountList
        refreshKey={refreshKey}
        onSelectAccount={setSelectedAccountId}
      />

      <TransactionList
        accountId={selectedAccountId}
        refreshKey={refreshKey}
      />
    </div>
  );
}

export default App;
