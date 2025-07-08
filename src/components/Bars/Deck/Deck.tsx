import type { DeckProps } from './DeckProps.types';
import { Pencil, Trash2 } from 'lucide-react';
import useStyles from './Deck.styles';

const Deck = (props: DeckProps) => {

    const styles = useStyles();

    return (
        <div className={styles.deck}>
            <div className={styles.deckHeader}>
                <strong>{props.name}</strong>
                <div className={styles.deckActions}>
                    <Pencil className={styles.icon} color="gray" size={18} />
                    <Trash2 className={styles.icon} color="gray" size={18} />
                </div>
            </div>
            <hr className={styles.separator} />
            <p className={styles.description}>{props.description}</p>
            <strong className={styles.language}>{props.sourceLanguage} | {props.translationLanguage}</strong>
        </div>
    );
}

export default Deck;