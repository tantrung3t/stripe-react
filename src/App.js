import { BrowserRouter as Switch, Routes, Route } from 'react-router-dom';
import './App.css';
import Card from "./Card"
function App() {
  return (
    <Switch>
      <Routes>
        <Route path="/" element={<Card />}>
        </Route>
      </Routes>

    </Switch>
  );
}


export default App;
