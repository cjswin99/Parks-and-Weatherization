
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ParkPage from './pages/ParkPage';

// where Charles added in
import { ParkProvider } from './context/ParkContext';
import ParkSearch from './components/ParkSearch';

function App() {
  return (
    <ParkProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold">National Parks Trip Planner</h1>
        <ParkSearch />
      </div>
    </ParkProvider>
  );
}

export default App;
// end Charles' add in

{/* imports the  cart context and cart 
  import { CartProvider } from './context/CartContext'
import Cart from './components/Cart'
*/}

// function App() {

//   return (
//     <>
//       {/*<CartProvider>*/}
//         <Navbar />
//         {/*<Cart />*/}
//         <Outlet />
//       {/*</CartProvider>*/}
//     </>
//   )
// }

// export default App