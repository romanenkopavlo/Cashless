import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [message, setMessage] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>React + Node.js</h1>
            <p>{message}</p>
        </div>
    );
}

export default App
