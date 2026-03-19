import { useContext } from "react"
import MenuBar from "./MenuBar"
import SideBar from "./SideBar"
import ContextStore from "../context/ContextStore"

const Dashboard = ({ children, activeMenu }) => {

  const { user } = useContext(ContextStore)

  return (
    <div>
      <MenuBar active={activeMenu} />
      {
        user && <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideBar active={activeMenu} />
          </div>
          <div className="grow mx-2 md:mx-5">
            {children}
          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard