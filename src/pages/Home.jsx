import { Box, Button, Typography } from "@mui/material";
import OpenCloseTab from "../components/OpenCloseTab";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getallticket } from "../apicalls";

export default function Home() {
    const navigate = useNavigate();
    const [tickets,setTickets] = useState([]);
    useEffect(()=>{
        (async()=>{
            const result = await getallticket();
            setTickets(result.data.items);
            console.log(result.data.items);
        })();
    },[])
    return (
        <Box>
            <Typography sx={{ textAlign: "center", mt: 2 }} variant="h4">
                Ticket System
            </Typography>
            {/* <Box
                sx={{ display: "flex", justifyContent: "space-between", p: 3 }}
            >
                <Typography>Ticket System</Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate(`/ticketform`);
                    }}
                >
                    Open New Ticket
                </Button>
            </Box> */}

            <Box>
                <OpenCloseTab tickets={tickets}/>
            </Box>
        </Box>
    );
}
