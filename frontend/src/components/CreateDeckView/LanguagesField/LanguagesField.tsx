import { useState } from 'react';
import type LanguagesFieldProps from './LanguagesField.types';
import useStyles from './LanguagesField.styles';

const LanguaguesField = (props: LanguagesFieldProps) => {

    const LANGUAGES = ["English", "Polish", "Spanish", "French", "German", "Chinese", "Japanese"];
    const [isVisible, setIsVisible] = useState(false);
    const styles = useStyles()
    console.log(LANGUAGES.indexOf(props.language));
    return (
        <>
            <p className={styles.languageChoice} onClick={() => setIsVisible(!isVisible)}>{props.language}</p>
            <div className={styles.languagesList}>
                {isVisible && LANGUAGES
                    .filter(language => language !== props.language)
                    .map(language => (
                        <p
                            key={language}
                            className={styles.languageOption}
                            onClick={() => {
                                props.changeLanguage(language);
                                setIsVisible(false);
                            }}
                        >
                            {language}
                        </p>
                    ))}
            </div>
        </>
    );
}

export default LanguaguesField;
