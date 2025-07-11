import { useState } from 'react'
import useStyles from "./CreateDeckView.styles";
import LanguaguesField from "./LanguagesField/LanguagesField";

function EditView() {

    const styles = useStyles();;
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;
    const DECK_PLACEHOLDER = "My Deck"
    const DESCRIPTION_PLACEHOLDER = "Deck to learn a new language"
    const MISSING_DATA_ALERT = "Please fill all of the fields"
    const ENGLISH = "en"
    const LANGUAGES_HASHMAP = new Map<string, string>([
        ["English", "en"],
        ["Spanish", "es"],
        ["French", "fr"],
        ["German", "de"],
        ["Chinese", "cn"],
        ["Japanese", "jp"],
    ]);

    const [deckName, setDeckName] = useState<string>("")
    const [deckDescription, setDeckDescription] = useState<string>("")
    const [sourceLanguage, setSourceLanguage] = useState<string>(ENGLISH)
    const [translationLanguage, setTranslationLanguage] = useState<string>(ENGLISH)

    function findLanguageName(shortform: string) {
        for (const [key, value] of LANGUAGES_HASHMAP) {
            if (value === shortform) {
                return key;
            }
        }
    }

    function changeSourceLanguage(language: string) {
        const shortFormOfTheLanguage = LANGUAGES_HASHMAP.get(language);
        setSourceLanguage(shortFormOfTheLanguage || ENGLISH);
    }

    function changeTranslationLanguage(language: string) {
        const shortFormOfTheLanguage = LANGUAGES_HASHMAP.get(language);
        setTranslationLanguage(shortFormOfTheLanguage || ENGLISH);
    }

    function isEverythingFilled() {
        return deckName && deckDescription && sourceLanguage && translationLanguage;
    }


    function handleDeckCreation() {
        if (isEverythingFilled()) {
            fetch(`${DB_ADDRESS}${DECKS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: deckName,
                    description: deckDescription,
                    sourceLanguage: sourceLanguage,
                    translationLanguage: translationLanguage
                })
            })
                .then(response => response.json())
                .then(data => window.location.href = `/edit/${data.id}`);
        } else {
            alert(MISSING_DATA_ALERT)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <p className={styles.title}>Create new deck</p>
            <hr className={styles.separator} />
            <div className={styles.form}>
                <div className={styles.textInputContainer}>
                    <p className={styles.text}>Deck Name</p>
                    <input className={styles.deckNameInput} type="text" placeholder={DECK_PLACEHOLDER} onChange={e => setDeckName(e.target.value)} />
                    <p className={styles.text}>Deck Description</p>
                    <textarea className={styles.descriptionInput}
                        name="description"
                        placeholder={DESCRIPTION_PLACEHOLDER}
                        onChange={e => setDeckDescription(e.target.value)} />
                </div>
                <div className={styles.languageChoiceContainer}>
                    <p className={styles.text}>Learning <br className={styles.splitLines} />Language</p>
                    <LanguaguesField language={findLanguageName(sourceLanguage)} changeLanguage={changeSourceLanguage} />
                </div>
                <div className={styles.languageChoiceContainer}>
                    <p className={styles.text}>Translation <br className={styles.splitLines} /> Language</p>
                    <LanguaguesField language={findLanguageName(translationLanguage)} changeLanguage={changeTranslationLanguage} />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.createDeckButton} onClick={() => handleDeckCreation()}>CREATE DECK</button>
            </div>
        </div >
    )
}

export default EditView;