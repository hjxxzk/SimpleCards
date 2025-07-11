import { useState } from 'react';
import type LanguagesFieldProps from './LanguagesField.types';
import useStyles from './LanguagesField.styles';

const LanguaguesField = (props: LanguagesFieldProps) => {

    const LANGUAGES = ["English", "Spanish", "French", "German", "Chinese", "Japanese"];
    const [indexOfChosenLanguage, setIndexOfChosenLanguage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const styles = useStyles()

    return (
        <>
            <p className={styles.languageChoice} onClick={() => setIsVisible(!isVisible)}>{props.language}</p>
            <div className={styles.languagesList}>
                {isVisible && LANGUAGES.filter((_, index) => index != indexOfChosenLanguage).map((language) => (
                    <p className={styles.languageOption}
                        onClick={() => { props.changeLanguage(language), setIndexOfChosenLanguage(LANGUAGES.indexOf(language)), setIsVisible(false) }}>{language}</p>
                ))}
            </div>
        </>
    );
}

export default LanguaguesField;
