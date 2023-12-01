import styles from './SectionBanner.module.css';

export const SectionBanner = ({img}: {img: string}) => {
    return(
        <div className={styles.SectionBannerContainer}>
            <img src={img} alt={img} className={styles.SectionBannerImage}/>
        </div>
    )
}