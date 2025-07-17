import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import type { CardProps } from './CardProps.types';
import { Trash2 } from 'lucide-react';
import useStyles from './Card.styles';
import DeletePopup from '../../Bars/DeletePopup/DeletePopup';

const Card = (props: CardProps) => {

    const styles = useStyles();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const params = useParams()

    const [isShorterMessageVisible, setIsShorterMessageVisible] = useState(true);
    const MEDIUM_OR_LARGER_SCREEN = "(width > 1024px)";
    const match = window.matchMedia(MEDIUM_OR_LARGER_SCREEN)
    match.addEventListener('change', (event) => {
        if (event.matches) {
            setIsShorterMessageVisible(true);
        } else {
            setIsShorterMessageVisible(false);
        }
    });

    useEffect(() => {
        if (match.matches) {
            setIsShorterMessageVisible(true);
        } else {
            setIsShorterMessageVisible(false);
        }
    }, [match.matches]);

    function handleDeleteDeck() {
        setPopupVisible(true);
    }

    function closePopup() {
        setPopupVisible(false);
    }

    function confirmDeleteDeck() {
        props.deleteCard?.(props._id);
    }

    return (
        <div className={styles.cardContainer}>
            <div className={`${styles.card} ${params?.card_id === props._id.toString() ? 'bg-amber-300' : ''}`} >
                <div className={styles.cardHeader}>
                    <Trash2 className={styles.delete} color="gray" size={18} onClick={(event) => { event.stopPropagation(), handleDeleteDeck() }} />
                </div>
                <p>{props.word}</p>
            </div>
            {isPopupVisible && <DeletePopup handleNo={closePopup} handleYes={confirmDeleteDeck} message={isShorterMessageVisible ? 'Do you want to delete this card?' : 'Delete?'} title="Delete Card" />}
        </div>
    );
}

export default Card;