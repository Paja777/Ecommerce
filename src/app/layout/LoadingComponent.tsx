import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

export default function LoadingComponent({message = 'Loading...'}: Props) {
    return (
        <Backdrop open={true} invisible={false} className="z-[99]">
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={100} color="secondary"/>
                <Typography variant="h4" sx={{ color: 'white',justifyContent: 'center', position: 'fixed', top: '60%'}}>{message}</Typography>
            </Box>
        </Backdrop>
    )
}