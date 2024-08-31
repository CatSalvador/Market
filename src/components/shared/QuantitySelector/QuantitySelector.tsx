import styles from './QuantitySelector.module.css';
import {IconButton} from "@mui/material";
import React, {useState} from "react";

interface QuantitySelectorProps {
    total: number
    uniqueId: string
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({uniqueId, total}) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const [count, setCount] = useState<number>(total)
    const updateCartItemTotal = () => {
        const updatedCart = cart.map(c => c.uniqueId === uniqueId ? {...c, total: count} : c)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    return (
        <div className={styles['quantity-selector']}>
            <IconButton aria-label="delete" disableRipple onClick={() => {
                if (!count) return
                setCount(prevState => prevState - 1)
                updateCartItemTotal()
            }}>
                -
            </IconButton>
            <span>{count}</span>
            <IconButton aria-label="delete" disableRipple onClick={() => {
                setCount(prevState => prevState + 1)
                updateCartItemTotal()
            }}>
                +
            </IconButton>
        </div>
    )
}