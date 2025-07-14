import { useState } from 'react';
import { useParams } from "react-router-dom";
import type { CardProps } from './CardProps.types';
import { Trash2 } from 'lucide-react';
import useStyles from './Card.styles';
import DeletePopup from '../../Bars/DeletePopup/DeletePopup';

const Card = (props: CardProps) => {

    const styles = useStyles();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const params = useParams()

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
            <div className={`${styles.card} ${params.id === props._id.toString() ? 'border-amber-300 border-3' : ''}`} >
                <div className={styles.cardHeader}>
                    <Trash2 className={styles.delete} color="gray" size={18} onClick={(event) => { event.stopPropagation(), handleDeleteDeck() }} />
                </div>
                <p>{props.word}</p>
            </div>
            {isPopupVisible && <DeletePopup handleNo={closePopup} handleYes={confirmDeleteDeck} message='Do you want to delete this Card?' title="Delete Card" />}
        </div>
    );
}

export default Card;