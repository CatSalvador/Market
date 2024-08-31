import styles from './DeliveryForm.module.css';
import {Control, Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import React, {useEffect, useId, useState} from "react";
import {Button} from "../shared/Button/Button.tsx";
import {OutlinedInput} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "../../constant/links.tsx";

interface IFormInput {
    date: string;
    time: string;
    address: string;
    name: string;
    phone: string;
}

const DELIVERY_COST = 200

export const DeliveryForm = () => {
    const [sum, setSum] = useState<number>(0)
    const id = useId();
    const navigate = useNavigate();
    const {control, handleSubmit, formState: {errors}} = useForm<IFormInput>({
        defaultValues: {
            date: '',
            time: '',
            address: '',
            name: '',
            phone: ''
        }
    });

    const order = JSON.parse(localStorage.getItem('cart') || '')

    useEffect(() => {
        const sum = order.reduce((accumulator, item) => {
            const price = item.variations[0].price;
            return accumulator + (price * item.total);
        }, 0);
        setSum(sum)
    }, []);

    const onSubmit: SubmitHandler<IFormInput> = data => {
        const orders = JSON.parse(localStorage.getItem('orders')) || []
        const newOrder = {id, sum, ...data, order}
        orders.push(newOrder)
        localStorage.setItem('orders', JSON.stringify(orders))
        localStorage.removeItem('cart')
        navigate(AppRoute.ORDERS_HISTORY);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['delivery-form']}>
            <div className={styles['form']}>
                <div className={styles['delivery-time']}>
                    <span className={styles['title']}>Когда доставить?</span>
                    <div className={styles['time-block']}>
                        <Controller
                            name="date"
                            control={control as Control<FieldValues>}
                            rules={{required: 'Выберите дату'} as any}
                            render={({field}) => (
                                <OutlinedInput
                                    placeholder="Выберите дату"
                                    {...field}
                                    error={!!errors.address}
                                    sx={{...buttonStyle, width: '140px'}}
                                />
                            )}
                        />
                        <Controller
                            name="time"
                            control={control as Control<FieldValues>}
                            rules={{required: 'Выберите время'} as any}
                            render={({field}) => (
                                <OutlinedInput
                                    placeholder="Выберите время"
                                    {...field}
                                    error={!!errors.address}
                                    sx={{...buttonStyle, width: '140px'}}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={styles['delivery-address']}>
                    <span className={styles['title']}>Куда доставить?</span>
                    <Controller
                        name="address"
                        control={control as Control<FieldValues>}
                        rules={{required: 'Введите адрес'} as any}
                        render={({field}) => (
                            <OutlinedInput
                                placeholder="Адрес"
                                {...field}
                                error={!!errors.address}
                                sx={{...buttonStyle}}
                            />
                        )}
                    />
                </div>
                <div className={styles['delivery-name']}>
                    <span className={styles['title']}>Имя</span>
                    <Controller
                        name="name"
                        control={control as Control<FieldValues>}
                        rules={{required: 'Введите имя'} as any}
                        render={({field}) => (
                            <OutlinedInput
                                placeholder="Имя"
                                {...field}
                                error={!!errors.name}
                                sx={{...buttonStyle}}
                            />
                        )}
                    />
                </div>
                <div className={styles['delivery-phone']}>
                    <span className={styles['title']}>Телефон</span>
                    <Controller
                        name="phone"
                        control={control as Control<FieldValues>}
                        rules={{required: 'Введите телефон'} as any}
                        render={({field}) => (
                            <OutlinedInput
                                placeholder="Телефон"
                                {...field}
                                error={!!errors.phone}
                                sx={{...buttonStyle}}
                            />
                        )}
                    />
                </div>
            </div>
            <div className={styles['manage']}>
                <div className={styles['check']}>
                    <div>Стоимость товаров<span>{sum}</span></div>
                    <div>Стоимость доставки<span></span>{DELIVERY_COST} p</div>
                    <div>Итого<span>{sum + DELIVERY_COST}</span></div>
                </div>
                <Button disabled={!sum} type='submit' name='Сделать заказ' variant="contained"
                        sx={{backgroundColor: '#2967FF'}}/>
            </div>
        </form>
    );
}

const buttonStyle = {
    borderRadius: '50px',
    '& .MuiOutlinedInput-input': {
        height: '40px',
        padding: '0 14px',
    },
}
