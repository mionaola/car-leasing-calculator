import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import s from './Count.module.css';

export const Count = ({ label, data, getCountData }) => {
    const [monthlyPayment, setMonthlyPayment] = useState('114455');
    const [leasingCost, setLeasingCost] = useState('');

    let { cost, initialFee, term } = data;
    let countData = useRef();

    useMemo(() => {
        countData.current = {
            monthlyPayment: monthlyPayment,
            leasingCost: leasingCost
        };
    }, [monthlyPayment, leasingCost]);

    const countMonthlyPayment = useCallback(() => {
        const payment = (cost - initialFee) * ((0.035 * Math.pow((1 + 0.035), term)) / (Math.pow((1 + 0.035), term) - 1));
        setMonthlyPayment(payment.toFixed(0));
    }, [cost, initialFee, term, setMonthlyPayment])

    const countLeasingCost = useCallback(() => {
        setLeasingCost(parseFloat(initialFee + term * monthlyPayment).toFixed(0));
    }, [setLeasingCost, initialFee, term, monthlyPayment])

    useEffect(() => {
        countMonthlyPayment();
        countLeasingCost();
        if (cost === '' || term === '') {
            setMonthlyPayment('36 000');
            setLeasingCost('2 260 000');
        }
    }, [cost, term, initialFee, monthlyPayment, countMonthlyPayment, countLeasingCost, setMonthlyPayment, setLeasingCost]);

    useEffect(() => {
        getCountData(countData);
    }, [countData, getCountData]);

    const isMonthlyPayment = label === 'Ежемесячный платеж от';
    return (
        <div className={s['count-wrapper']}>
            <p className={s.label}>{label}</p>
            <div className={s.value}>{isMonthlyPayment ? monthlyPayment : leasingCost} ₽</div>
        </div>
    );
}