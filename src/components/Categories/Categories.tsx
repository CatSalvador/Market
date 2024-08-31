import styles from './Categories.module.css';
import React, {useState} from "react";
import {Category, CategoryType} from '../Category/Category.tsx';
import {Button} from "../shared/Button/Button.tsx";
import {SortOptionsModal} from "../SortOptionsModal/SortOptionsModal.tsx";

interface CategoriesProps {
    categories: [CategoryType]
    activeCategory: number | null
    setActiveCategory: (number) => void
    sort: string
    setSort: (v: string) => void
}

export const Categories: React.FC<CategoriesProps> = (
    {
        categories,
        activeCategory,
        setActiveCategory,
        sort,
        setSort
    }
) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className={styles['categories-wrapper']}>
            <>
                <span className={styles['title']}>Категории товаров</span>
                <span className={styles['settings']}></span>
                <Button
                    name='Настройки'
                    variant='text'
                    sx={{fontSize: '0.8em', color: '#3768e6', fontWeight: 'bold'}}
                    onClick={() => setOpen(true)}
                />
            </>
            <div className={styles['categories']}>
                <SortOptionsModal
                    open={open}
                    setOpen={setOpen}
                    sort={sort}
                    setSort={setSort}
                />
                {categories.map((category, index) => (
                    <Category
                        key={category.id}
                        id={category.id}
                        parent_id={category.parent_id}
                        name={category.name}
                        isActive={activeCategory === category.id}
                        onClick={setActiveCategory}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}