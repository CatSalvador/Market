import {Button as MuiButton} from "@mui/material";

export const Button = ({name, sx, ...props}) => {
    return (
        <MuiButton
            sx={{
                borderRadius: '50px',
                fontSize: '0.9em',
                textTransform: 'none',
                padding: '8px 10px',
                wordSpacing: '3px',
                ...sx,
            }}
            {...props}
        >
            {name}
        </MuiButton>
    )
}