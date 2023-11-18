import { Card, SxProps, Theme } from "@mui/material"

const MainCard = ({ children, sx }) => {
    return (
        <Card
            sx={{
                py: 1,
                boxShadow: 0,
                textAlign: 'center',
                borderRadius: '6px',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                '& a': {
                    textDecoration: 'none'
                },
                ...sx
            }}
        >
            {children}
        </Card>
    )
}

export default MainCard
