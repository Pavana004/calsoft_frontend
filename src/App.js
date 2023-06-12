import './App.css';
import {BrowserRouter as Router , Route} from "react-router-dom"
import Home from './container/Home';
import Wallet from './container/Wallet';
import Admin from './container/Admin';


function App() {
  return (
    <>
      
      <Router>
         <Route path="/" component={Home} exact />
         <Route path="/wallet/:id" component={Wallet} exact />
         <Route path="/payment" component={Admin} exact />
      </Router>
    </>
   
  );
}

export default App;
