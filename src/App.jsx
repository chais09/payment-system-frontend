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
      <h1>Wise Payments</h1>

      <section>
        <CreateAccountForm onCreated={refresh} />
      </section>

      <section>
        <TransferForm
          onTransferSuccess={refresh}
          refreshKey={refreshKey}
        />
      </section>

      <section>
        <AccountList
          refreshKey={refreshKey}
          onSelectAccount={setSelectedAccountId}
          onRefresh={refresh}
        />
      </section>

      <section>
        <TransactionList
          accountId={selectedAccountId}
          refreshKey={refreshKey}
        />
      </section>
    </div>
  );
}

export default App;
