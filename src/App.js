import './App.css';
import { HashRouter as Router,Route } from 'react-router-dom'
import Header from './components/Header'
import AdminScreen from './AdminScreen'
import Loginscreen from './Loginscreen'
import Homescreen from './Homescreen';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      
      <Route path="/" component={Loginscreen} exact/>
      <Route path="/doctor" component={AdminScreen}/>
      <Route path="/book" component={Homescreen}/>
      
      </Router>

      
    </div>
  );
}

export default App;
