import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const effect = async () => {
      const response = await fetch("/api/");
      const data = await response.json();

      setMessage(data.message);
    };

    effect();
  }, []);

  return <div>{message}</div>;
};

export default App;
