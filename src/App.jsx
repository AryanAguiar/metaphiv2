import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layouts';
import ScrollToTop from './components/ScrollToTop';

function App() {

  return (
    <>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
