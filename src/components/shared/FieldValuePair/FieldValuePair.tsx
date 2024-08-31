import styles from './FieldValuePair.module.css';
import React from "react";

interface FieldValuePairProps {
    name: string,
    value: string | React.ReactNode
}

export const FieldValuePair: React.FC<FieldValuePairProps> = ({name, value}) => (
    <div className={styles['label']}>
        <span className={styles['name']}>{name}</span>
        <span className={styles['value']}>{value}</span>
    </div>
)