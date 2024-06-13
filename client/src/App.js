import { Routes, Route } from 'react-router-dom';

// import routes
import Home from './components/pages/Home/Home';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import AddAd from './components/pages/AddAd/AddAd';
import EditAd from './components/pages/EditAd/EditAd';
import NewAd from './components/pages/NewAd/NewAd';
import DeleteAd from './components/pages/DeleteAd/DeleteAd';
import Search from './components/pages/Search/Search';
import NotFound from './components/pages/NotFound/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/ads/:id" element={<AddAd />} />
      <Route path="/edit/:id" element={<EditAd />} />      
      <Route path="/add" element={<NewAd />} />
      <Route path="/delete/:id" element={<DeleteAd />} />
      <Route path="/search/:searchPhrase" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;