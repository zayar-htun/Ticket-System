import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ThemedApp from "./ThemedApp.jsx";
import TicketForm from "./pages/TicketForm.jsx";
import TicketDetail from "./pages/TicketDetail.jsx";
import Home from "./pages/Home.jsx";
import ViewCategory from "./components/category/ViewCategory.jsx";
import CreateCategory from "./pages/CreateCategory.jsx";
import Assign from "./pages/Assign.jsx";
import AddAssign from "./pages/AddAssign.jsx";

const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <ThemedApp />,

    // },
    // {
    //     path: "/ticketform",
    //     element: <TicketForm />,
    // },
    // {
    //     path: "/ticketdetail/:ticketId/:guid",
    //     element: <TicketDetail />,
    // },
    {
        path: "/",
        element: <ThemedApp />,
        children: [
            {
                path: "/", // Relative path
                element: <Home />,
            },
            {
                path: "/ticketform",
                element: <TicketForm />,
            },
            {
                path: "/ticketdetail/:ticketId/:guid",
                element: <TicketDetail />,
            },
            {
                path: "/allCategories",
                element: <ViewCategory />,
            },
            {
                path: "/createCategory",
                element: <CreateCategory />,
            },
            {
                path: "/allAssign",
                element: <Assign />,
            },
            {
                path: "/addAssign",
                element: <AddAssign />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
