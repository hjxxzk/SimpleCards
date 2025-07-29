import useStyles from "./Banner.styles";

export const Banner = () => {

    const logoPath = window.location.protocol + "//" + window.location.host + "/images/logo.png";
    const styles = useStyles();

    return (
        <div className={styles.bannerContainer}>
            <img src={logoPath} alt="Logo" className={styles.logo} />
        </div>
    );
}