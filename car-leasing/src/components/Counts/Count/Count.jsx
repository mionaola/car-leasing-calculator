import { useEffect } from 'react';
import { useState } from 'react';
import s from './Count.module.css';

export const Count = ({ label, data, getCountData }) => {
    const [monthlyPayment, setMonthlyPayment] = useState('114455');
    const [leasingCost, setLeasingCost] = useState('');

    let { cost, initialFee, term } = data;

    const countData = {
        monthlyPayment: monthlyPayment,
        leasingCost: leasingCost
    };

    const countMonthlyPayment = () => {
        const payment = (cost - initialFee) * ((0.035 * Math.pow((1 + 0.035), term)) / (Math.pow((1 + 0.035), term) - 1));
        setMonthlyPayment(payment.toFixed(0));
    }

    const countLeasingCost = () => {
        setLeasingCost(parseFloat(initialFee + term * monthlyPayment).toFixed(0));
    }

    useEffect(() => {
        countMonthlyPayment();
        countLeasingCost();
        if (cost === '' || term === '') {
            setMonthlyPayment('36 000');
            setLeasingCost('2 260 000');
        }
    }, [cost, term, initialFee, monthlyPayment]);

    useEffect(() => {
        getCountData(countData);
    }, [monthlyPayment, leasingCost]);

    const isMonthlyPayment = label === 'Ежемесячный платеж от';
    return (
        <div className={s['count-wrapper']}>
            <p className={s.label}>{label}</p>
            <div className={s.value}>{isMonthlyPayment ? monthlyPayment : leasingCost} ₽</div>
        </div>
    );
}