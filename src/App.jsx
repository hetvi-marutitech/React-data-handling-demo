import { useState, lazy, Suspense } from "react";
import FetchPage from "./pages/FetchPage";
import AxiosPage from "./pages/AxiosPage";
const DatePickerDemo = lazy(
  () => import("./components/DatePicker")
);

function App() {
  const [activePage, setActivePage] = useState("axios");
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React API Demo</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActivePage("fetch")}
          style={{ marginRight: "10px" }}
        >
          Fetch API
        </button>

        <button onClick={() => setActivePage("axios")}>
          Axios
        </button>
      </div>

      <hr />

      {activePage === "fetch" && <FetchPage />}

      {activePage === "axios" && <AxiosPage />}

      <button
        onClick={() => setShowDatePicker(true)}
      >
        Load Date Picker
      </button>

      <button
        onClick={() => setShowDatePicker(false)}
      >
        Hide Date Picker
      </button>

      {showDatePicker && (
        <Suspense fallback={<p>Loading Date Picker...</p>}>
          <DatePickerDemo />
        </Suspense>
      )}
    </div>
  );
}

export default App;