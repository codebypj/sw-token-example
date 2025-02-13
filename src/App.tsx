import { use, useEffect, useState } from "react";

function sendTokenToServiceWorker(token: string) {
  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "SET_TOKEN",
      token: token,
    });
  }
}

const fetchData = async () => {
  const response = await fetch("https://httpbin.org/get");
  return await response.json();
};

function App() {
  useEffect(() => {
    // Send initial token when service worker is ready
    navigator.serviceWorker?.ready.then(() => {
      sendTokenToServiceWorker("my-access-token");
    });
  }, []);

  const [response, setResponse] = useState();

  const handleClick = async () => {
    const response = await fetchData();
    setResponse(response);
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch Data</button>
      <section aria-label="Response Data">
        <h2>Response Data</h2>
        <pre>
          <code>{JSON.stringify(response, null, 2)}</code>
        </pre>
      </section>
    </div>
  );
}

export default App;
