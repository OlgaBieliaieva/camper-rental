import styles from './Chip.module.css'

export default function Chip({children}) {
return (
    <div className={styles.wrapper}>
        {children}
    </div>
)
}