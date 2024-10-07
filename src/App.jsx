import Canvas from "./components/Canvas/index.jsx";
import s from "./App.module.css";

function App() {
    return (
        <div className={s.body}>
            <header>
                <h1>Create a certificate</h1>
            </header>
            <Canvas />
        </div>
    );
}

export default App;
