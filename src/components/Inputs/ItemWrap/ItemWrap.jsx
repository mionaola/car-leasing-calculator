import s from './ItemWrap.module.css';

export const ItemWrap = ({ children }) => {
    return (
        <div className={s['item-wrapper']}>{children}</div>
    )
}