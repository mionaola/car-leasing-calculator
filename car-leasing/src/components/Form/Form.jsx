import { useEffect } from 'react';
import { useState } from 'react';
import { SERVER_URL } from '../../constants/constants';
import { sendForm } from '../../utils/functions';
import { Button } from '../Button/Button';
import { Count } from '../Counts/Count/Count';
import { Counts } from '../Counts/Counts';
import { InputsWrap } from '../Inputs/InputsWrap/InputsWrap';
import { ItemWrap } from '../Inputs/ItemWrap/ItemWrap';
import s from './Form.module.css';


export const Form = () => {
    const [cost, setCost] = useState('3300000');
    const [initialFeeRate, setInitialFeeRate] = useState('10');
    const [term, setTerm] = useState('60');
    const [initialFee, setInitialFee] = useState('330000'); // Я поменяла значение первоначального взноса, так как заданное не соответсвовало введенным по умолчанию данным.
    const [isFormSent, setIsFormSent] = useState(false);
    const [countData, setCountData] = useState({});

    const onCostChangeHandler = (event) => {
        setCost(event.target.value);
        countInititalFee();
    }

    const onInitialFeeChangeHandler = (event) => {
        setInitialFeeRate(event.target.value);
        countInititalFee();
    }

    const onTermChangeHandler = (event) => {
        setTerm(event.target.value);
    }

    const countInititalFee = () => {
        setInitialFee(Math.floor(parseFloat(initialFeeRate / 100 * cost)));
    }

    //Input validation
    const onCostBlur = (event) => {
        if (Number(event.target.value) > 6000000) setCost('6000000');
        if (Number(event.target.value) < 1000000) setCost('1000000');
    }

    const onInitialFeeRateBlur = (event) => {
        if (Number(event.target.value) > 60) setInitialFeeRate('60');
        if (Number(event.target.value) < 10) setInitialFeeRate('10');
    }

    const onTermBlur = (event) => {
        if (Number(event.target.value) > 60) setTerm('60');
        if (Number(event.target.value) < 1) setTerm('1');
    }

    useEffect(() => {
        countInititalFee();
        if (cost === '' || term === '' || initialFeeRate === '') {
            setInitialFee('100 000');
        }
    }, [cost, initialFee, term, initialFeeRate]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const data = {
            car_cost: cost,
            initial_fee: initialFee,
            initial_fee_rate: initialFeeRate,
            term: term,
            monthly_payment: countData.monthlyPayment,
            leasingCost: countData.leasingCost
        }

        sendForm(SERVER_URL, data);
        setIsFormSent(true);
    }

    //Gets data from Count components to send it to a server
    const getCountData = (data) => {
        setCountData(data);
    }

    let data = {
        cost: cost,
        term: term,
        initialFee: initialFee
    };

    return (
        <form className={s.form} onSubmit={onFormSubmit} >
            <InputsWrap>
                <ItemWrap>
                    <label htmlFor="cost" className={s.label}>Стоимость автомобиля</label>
                    <input id='cost' type="number" className={s.text} min='1000000' max='6000000' value={cost} onChange={onCostChangeHandler} onBlur={onCostBlur} disabled={isFormSent} required />
                    <input type="range" className={s.range} disabled={isFormSent} min={1000000} max={6000000} step={10000} value={cost} onChange={onCostChangeHandler} />
                    <p className={s.description}>₽</p>
                </ItemWrap>
                <ItemWrap>
                    <label htmlFor="initialFee" className={s.label}>Первоначальный взнос</label>
                    <div className={s.text} disabled={isFormSent}>
                        <p>{initialFee}</p>
                        <input id='initialFee' type="number" className={s.text_initialFee} min={10} max={60} value={initialFeeRate} onBlur={onInitialFeeRateBlur} onChange={onInitialFeeChangeHandler} disabled={isFormSent} required />
                        <p className={s.description_percent}>%</p>
                    </div>
                    <input type="range" className={s.range} disabled={isFormSent} min={10} max={60} value={initialFeeRate} onChange={onInitialFeeChangeHandler} />
                </ItemWrap>
                <ItemWrap>
                    <label htmlFor="term" className={s.label}>Срок лизинга</label>
                    <input id='term' type="number" className={s.text} min={1} max={60} value={term} onBlur={onTermBlur} onChange={onTermChangeHandler} disabled={isFormSent} required />
                    <input type="range" className={s.range} disabled={isFormSent} min={1} max={60} value={term} onChange={onTermChangeHandler} />
                    <p className={s.description}>мес</p>
                </ItemWrap>
            </InputsWrap>
            <Counts>
                <Count label='Сумма договора лизинга' data={data} getCountData={getCountData} />
                <Count label='Ежемесячный платеж от' data={data} getCountData={getCountData} />
                <Button isFormSent={isFormSent} />
            </Counts>
        </form >
    );
}