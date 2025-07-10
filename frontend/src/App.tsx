import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReviewView from './components/ReviewView/ReviewView';
import EditView from './components/EditView/EditView';
import UserView from './components/UserView/UserView';
import CreateDeckView from './components/CreateDeckView/CreateDeckView';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ReviewView />} />
          <Route path="/:id" element={<ReviewView />} />
          <Route path="/edit/:id" element={<EditView />} />
          <Route path="/create" element={<CreateDeckView />} />
        </Route>
        <Route path="/user" element={<UserView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
