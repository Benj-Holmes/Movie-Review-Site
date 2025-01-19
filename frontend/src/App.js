import './App.css';
import Header from './components/header/header';

function App() {
  return (
    // Bootstrap requires a container class to wrap the site's content
    <div className="container-fluid">
        <Header />
    </div>
  );
}

export default App;
