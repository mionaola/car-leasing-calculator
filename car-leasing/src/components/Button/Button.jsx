import s from './Button.module.css';

export const Button = ({ isFormSent }) => {
    return (
        <button className={s.button} disabled={isFormSent}>
            {isFormSent && <span className={s.spinner}></span>}
            {!isFormSent && <p>Отправить заявку</p>}
        </button>
    );
}