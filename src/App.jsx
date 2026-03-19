import Home from './pages/home/Home'
import Category from './pages/category/Category'
import Income from './pages/income/Income'
import Expense from './pages/expense/Expense'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Filter from './pages/filter/Filter'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/dashboard' element={<Home />} />
        <Route path='/category' element={<Category />} />
        <Route path='/income' element={<Income />} />
        <Route path='/expense' element={<Expense />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/filter' element={<Filter />} />
      </Routes>
    </>
  )

}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token")
  return isAuthenticated ? <Navigate to={'/dashboard'} /> : <Navigate to={"/login"} />
}

export default App