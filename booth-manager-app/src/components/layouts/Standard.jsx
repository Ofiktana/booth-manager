import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from 'react-router-dom'

export default function Standard(){
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}