import React from "react";
import {Copy} from "../../../assets/icons/Copy.tsx";
import {IconButton} from "@mui/material";
import styles from './ClipboardButton.module.css';

interface ClipboardButtonProps {
    value: string
}

export const ClipboardButton: React.FC<ClipboardButtonProps> = ({value}) => {
    const handleClick = () => navigator.clipboard.writeText(value)

    return (
        <IconButton aria-label="delete" color="primary" disableRipple onClick={handleClick} sx={{padding: '2px'}}>
            <span className={styles['value']}>{value}</span>
            <Copy/>
        </IconButton>
    );
}