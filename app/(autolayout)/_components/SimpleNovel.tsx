import { Box, Link, Typography } from "@mui/material";
import Image from 'next/image'
export function SimpleNovel({
    name = "",
    img = "",
    id = 0,
}) {
    return <Box 
        component={Link}
        height={200}
        width={120}
        href={`/novel/`+id}
        sx={{
            // '&:hover': {
            //     bgcolor: 'Highlight',
            // }
            textDecoration: 'none'
        }}
    >
            <Image 
                alt={name}
                height="166"
                width="120"
                src={img}
            />
            <Typography 
                textAlign={"center"}
            >{ name }</Typography>
        </Box>
}