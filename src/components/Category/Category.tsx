import styles from './Category.module.css';
import React from "react";

export interface CategoryType {
    id: number,
    name: string,
    parent_id: number,
}

export interface CategoryProps extends CategoryType {
    onClick: (val: number) => void,
    isActive: boolean,
    index: number

}

const MAX_COLORS = 4

export const Category: React.FC<CategoryProps> = ({id, name, isActive, onClick, index}) => {
    return (
        <div
            className={`${styles['category']} ${styles[`color-${index % MAX_COLORS}`]} ${isActive ? styles['active'] : ''}`}
            onClick={() => onClick(id)}
        >
            {name}
        </div>
    )
}