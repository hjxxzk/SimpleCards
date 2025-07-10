import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { DeckProps } from './DeckProps.types';
import { Pencil, Trash2 } from 'lucide-react';
import useStyles from './Deck.styles';
import DeleteDeckPopup from '../DeleteDeckPopup/DeleteDeckPopup';

const Deck = (props: DeckProps) => {

    const styles = useStyles();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();

    function handleDeleteDeck() {
        setPopupVisible(true);
    }

    function closePopup() {
        setPopupVisible(false);
    }

    function confirmDeleteDeck() {
        props.deleteDeck?.(props.id);
    }

    return (
        <div className={styles.deckContainer}>
            <div className={styles.deck} onClick={() => { navigate(`/${props.id}`) }} >
                <div className={styles.deckHeader}>
                    <strong>{props.name}</strong>
                    <div className={styles.deckActions}>
                        <Pencil className={styles.edit} color="gray" size={18} onClick={(event) => { event.stopPropagation(), navigate(`/edit/${props.id}`) }} />
                        <Trash2 className={styles.delete} color="gray" size={18} onClick={(event) => { event.stopPropagation(), handleDeleteDeck() }} />
                    </div>
                </div>
                <hr className={styles.separator} />
                <p className={styles.description}>{props.description}</p>
                <strong className={styles.language}>{props.sourceLanguage} | {props.translationLanguage}</strong>

            </div>
            {isPopupVisible && <DeleteDeckPopup handleNo={closePopup} handleYes={confirmDeleteDeck} />}
        </div>
    );
}

export default Deck;