import './App.css';
import Header from './components/header/header';
import ListDisplay from './components/homepage/listDisplay/listDisplay';
import Trending from './components/homepage/trendingMovie/trending';

function App() {
  return (
    // Bootstrap requires a container class to wrap the site's content
    <div className="container-fluid">
        <Header />
        <Trending />
        <ListDisplay />
    </div>
  );
}

export default App;
