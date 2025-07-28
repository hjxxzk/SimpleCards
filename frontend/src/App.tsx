import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewView from './components/ReviewView/ReviewView';
import EditView from './components/EditView/EditView';
import UserView from './components/UserView/UserView';
import CreateDeckView from './components/CreateDeckView/CreateDeckView';
import Layout from './Layout';
import LoginView from './components/LoginView/LoginView';
import { RegisterView } from './components/RegisterView/RegisterView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ReviewView />} />
          <Route path="/:id" element={<ReviewView />} />
          <Route path="/edit/:id" element={<EditView />}>
            <Route path="/edit/:id/:card_id" element={<EditView />} />
          </Route>
          <Route path="/create" element={<CreateDeckView />} />
        </Route>
        <Route path="/user" element={<UserView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
