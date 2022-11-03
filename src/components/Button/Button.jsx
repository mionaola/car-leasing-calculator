import { memo } from 'react';
import s from './Button.module.css';

export const Button = memo(({ isFormSent }) => {
    return (
        <button className={s.button} disabled={isFormSent}>
            {isFormSent && <span className={s.spinner}></span>}
            {!isFormSent && <p>Отправить заявку</p>}
        </button>
    );
}) 