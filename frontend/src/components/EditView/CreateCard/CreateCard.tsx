import { useState } from 'react';
import useStyles from "./CreateCard.styles";
import EditText from "../EditText/EditText";
import type CreateCardProps from './CreateCardProps.types';

const CreateCard = (props: CreateCardProps) => {

    const styles = useStyles()
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const [wordChanged, setWordChanged] = useState<string>("");
    const [translationChanged, setTranslationChanged] = useState<string>("");
    const WORD_PLACEHOLDER = "Word here";
    const TRANSLATION_PLACEHOLDER = "Translation here";
    const NO_EMPTY_FIELDS_ALERT = "Fields cannot be left empty!";


    function handleSave() {
        if (!(wordChanged && translationChanged)) {
            alert(NO_EMPTY_FIELDS_ALERT);
        } else {
            saveNewCard();
            window.location.reload();
        }
    }

    async function saveNewCard() {
        await fetch(`${DB_ADDRESS}${CARDS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                word: wordChanged,
                translation: translationChanged,
                deck_id: props.deck_id,
            }),
        })
            .then(res => res.json())
            .catch(err => console.error('Error:', err));
    }

    function hasBothChanged() {
        return wordChanged !== "" && translationChanged !== "";
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <EditText word={wordChanged || ""} placeholder={WORD_PLACEHOLDER} changeWord={setWordChanged} isChanged={false} />
                <div className={styles.separator} />
                <EditText word={translationChanged || ""} placeholder={TRANSLATION_PLACEHOLDER} changeWord={setTranslationChanged} isChanged={false} />
                {hasBothChanged() && <button className={styles.saveButton} onClick={() => handleSave()}>SAVE</button>}
            </div>
        </div>
    );
}

export default CreateCard;