function App() {
  const [status, setStatus] = useState('');

  const checkDevices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/detect');
      if (response.data.status === "success") {
        setStatus(response.data.message);
      }
    } catch(err) {
      console.error(err);
    }
  };

  const triggerError = async () => {
    try {
      await axios.get('http://localhost:5000/error');
      setStatus("External device detected! System freeze activated.");
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkDevices, 5000); // Check every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
  (you can replace this with actual logic)
    if (status === "People detected.") {
      triggerError();
    }
  }, [status]);

  return (
    <div className="App">
      <h1>Device Scanner</h1>
      <p>Status: {status}</p>
    </div>
  );