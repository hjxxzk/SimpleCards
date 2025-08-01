import { useEffect, useState } from 'react';
import useStyles from "./EditCard.styles";
import type { EditCardProps } from "./EditCardProps.types";
import EditText from "../EditText/EditText";

const EditCard = (props: EditCardProps) => {

    const styles = useStyles()
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const CARDS = import.meta.env.VITE_CARDS;
    const [wordChanged, setWordChanged] = useState<string>(props.card?.word || "");
    const [translationChanged, setTranslationChanged] = useState<string>(props.card?.translation || "");
    const WORD_PLACEHOLDER = "Word here";
    const TRANSLATION_PLACEHOLDER = "Translation here";
    const NO_EMPTY_FIELDS_ALERT = "Fields cannot be left empty!";

    function hasAntyhingChanged() {
        return hasWordChanged() || hasTranslationChanged();
    }

    function hasWordChanged() {
        return props.card?.word !== wordChanged;
    }

    function hasTranslationChanged() {
        return props.card?.translation !== translationChanged;
    }

    function cancelWordEdit() {
        setWordChanged(props.card?.word || "");
    }


    function cancelTranslationEdit() {
        setTranslationChanged(props.card?.translation || "");
    }

    useEffect(() => {
        setWordChanged(props.card?.word || "");
        setTranslationChanged(props.card?.translation || "");
    }, [props.card?.word]);

    function handleSave() {
        if (!(wordChanged && translationChanged)) {
            alert(NO_EMPTY_FIELDS_ALERT);
        } else {
            patchCard();
            window.location.reload();
        }
    }

    async function patchCard() {
        const updatedCard = {
            _id: props.card?._id,
            word: wordChanged,
            translation: translationChanged,
            deck_id: props.card?.deck_id
        }

        await fetch(`${DB_ADDRESS}${CARDS}/${props.card?._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updatedCard }),
        })
            .then(res => res.json())
            .catch(err => console.error('Error:', err));

    }


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.formInputContainer}>
                    <p className={styles.title}>Word:</p>
                    <EditText word={wordChanged || ""} placeholder={WORD_PLACEHOLDER} changeWord={setWordChanged} cancelEdit={cancelWordEdit} isChanged={hasWordChanged()} />
                </div>
                <div className={styles.separator} />
                <div className={styles.formInputContainer}>
                    <p className={styles.title}>Translation:</p>
                    <EditText word={translationChanged || ""} placeholder={TRANSLATION_PLACEHOLDER} changeWord={setTranslationChanged} cancelEdit={cancelTranslationEdit} isChanged={hasTranslationChanged()} />
                </div>
                {hasAntyhingChanged() && <button className={styles.saveButton} onClick={() => handleSave()}>SAVE</button>}
            </div>
        </div>
    );
}

export default EditCard;