import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import type { DeckProps } from './DeckProps.types';
import { Pencil, Trash2 } from 'lucide-react';
import useStyles from './Deck.styles';
import DeleteDeckPopup from '../DeletePopup/DeletePopup';

const Deck = (props: DeckProps) => {

    const styles = useStyles();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();
    const EDIT_DECK_PAGE = `/edit/${props._id}`
    const REVIEW_DECK_PAGE = `/${props._id}`;
    const params = useParams()

    function handleDeleteDeck() {
        setPopupVisible(true);
    }

    function closePopup() {
        setPopupVisible(false);
    }

    function confirmDeleteDeck() {
        props.deleteDeck?.(props._id);
    }

    return (
        <div className={styles.deckContainer}>
            <div className={`${styles.deck} ${params.id === props._id.toString() ? 'border-amber-300 border-3' : ''}`} onClick={() => { console.log("tu"), navigate(REVIEW_DECK_PAGE) }} >
                <div className={styles.deckHeader}>
                    <strong>{props.name}</strong>
                    <div className={styles.deckActions}>
                        <Pencil className={styles.edit} color="gray" size={18} onClick={(event) => { event.stopPropagation(), navigate(EDIT_DECK_PAGE) }} />
                        <Trash2 className={styles.delete} color="gray" size={18} onClick={(event) => { event.stopPropagation(), handleDeleteDeck() }} />
                    </div>
                </div>
                <hr className={styles.separator} />
                <p className={styles.description}>{props.description}</p>
                <strong className={styles.language}>{props.sourceLanguage} | {props.translationLanguage}</strong>

            </div>
            {isPopupVisible && <DeleteDeckPopup handleNo={closePopup} handleYes={confirmDeleteDeck} title="Delete Deck" message="Do you want to delete this deck?" />}
        </div>
    );
}

export default Deck;