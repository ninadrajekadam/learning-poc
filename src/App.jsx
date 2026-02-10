import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from "./Header"
import Product from './Product'
import Cart from './Cart'

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </>
  )
}
export default App