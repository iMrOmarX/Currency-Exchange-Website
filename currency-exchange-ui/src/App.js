
import Header from './components/header/header-component';
import Home from './components/home/home-component';
import './app.css'
import LiveExhnage from './components/live-exhange/live-exchange-component';

function App() {
  return (
    <div id="app">
      <Header></Header>
      <Home></Home>
      <LiveExhnage></LiveExhnage>
    </div>
  );
}

export default App;
