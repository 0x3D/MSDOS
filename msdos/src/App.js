import './styles/App.css';
import Testcomponent from "./components/Testcomponent"
import AdminPage from './components/Adminpage/AdminPage';

function App() {
  document.title = 'MSDOS Booking'
  return (
    <div className="App">
      <h2> MSDOS </h2> 
      <Testcomponent />
      <AdminPage />

    </div>

  );
}

export default App;
