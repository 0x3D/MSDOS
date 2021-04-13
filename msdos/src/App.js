import './styles/App.css';
import Testcomponent from "./components/Testcomponent"


function App() {
  document.title = 'MSDOS Booking'
  return (
    <div className="App">
      <h2> MSDOS </h2> 
      <Testcomponent />
    </div>

  );
}

export default App;