import { useState } from 'react';
import useStyles from './LanguagesField.styles';

const LanguaguesField = () => {

    const LANGUAGES = ["English", "Spanish", "French", "German", "Chinese", "Japanese"];
    const [chosenLanguage, setChosenLanguage] = useState<string>(LANGUAGES[0]);
    const [indexOfChosenLanguage, setIndexOfChosenLanguage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const styles = useStyles()

    return (
        <>
            <p className={styles.languageChoice} onClick={() => setIsVisible(!isVisible)}>{chosenLanguage}</p>
            <div className={styles.languagesList}>
                {isVisible && LANGUAGES.filter((_, index) => index != indexOfChosenLanguage).map((language) => (
                    <p className={styles.languageOption}
                        onClick={() => { setChosenLanguage(language), setIndexOfChosenLanguage(LANGUAGES.indexOf(language)), setIsVisible(false) }}>{language}</p>

                ))}
            </div>
        </>
    );
}

export default LanguaguesField;
