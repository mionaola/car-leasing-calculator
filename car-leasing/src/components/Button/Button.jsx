import s from './Button.module.css';

export const Button = ({ isFormSent }) => {
    return (
        <button className={s.button} disabled={isFormSent}>Отправить заявку</button>
    );
}