import s from './Counts.module.css';

export const Counts = ({ children }) => {
    return (
        <div className={s.counts}>{children}</div>
    )
}