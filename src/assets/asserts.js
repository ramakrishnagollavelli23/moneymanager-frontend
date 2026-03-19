import logo from "./logo.png"
import bg_Img from './bg.png'
import { Label } from "recharts"
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react"

export const asserts = {
    logo,
    bg_Img
}

export const SIDE_BAR_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard"
    },

    {
        id: "02",
        label: "Category",
        icon: List,
        path: "/category"
    },
    {
        id: "03",
        label: "Income",
        icon: Wallet,
        path: "/income"
    },
    {
        id: "04",
        label: "Expense",
        icon: Coins,
        path: "/expense"
    },
    {
        id: "05",
        label: "Filter",
        icon: FunnelPlus,
        path: "/filter"
    }
]