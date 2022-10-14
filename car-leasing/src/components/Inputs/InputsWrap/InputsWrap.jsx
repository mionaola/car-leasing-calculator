import s from './InputsWrap.module.css';

export const InputsWrap = ({ children }) => {
    return (
        <div className={s['inputs-wrapper']}>{children}</div>
    )
}