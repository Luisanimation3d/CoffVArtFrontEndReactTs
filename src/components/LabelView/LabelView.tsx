import styles from './LabelView.module.css';

export const LabelView = () => {
    return (
        <div className={styles.labelView__label}>
            <div className={styles.labelView__label__text}>
                <p>Project in Development</p>
            </div>
        </div>
    )
}