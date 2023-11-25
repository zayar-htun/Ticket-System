import { Outlet } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar";
import Home from "./pages/Home";
import { useState } from "react";
import MainDrawer from "./components/MainDrawer";

export default function App() {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };
    return (
        <>
            <ButtonAppBar toggleDrawer={toggleDrawer} />
            <MainDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer}/>
            <Outlet/>
        </>
    );
}
