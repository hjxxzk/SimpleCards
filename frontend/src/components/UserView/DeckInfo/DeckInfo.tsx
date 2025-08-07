import type { DeckProps } from "../../Bars/Deck/DeckProps.types";
import useStyles from "./DeckInfo.styles";

export const DeckInfo = (deck: DeckProps) => {

    const styles = useStyles();

    return (
        <div className={styles.deckContainer} data-testid="deck">
            <div className={styles.deck} >
                <div className={styles.deckHeader}>
                    <strong>{deck.name}</strong>
                </div>
                <hr className={styles.separator} />
                <p>Cards known: 50%</p>
                <p>Number of repetitions: {deck.numberOfRepetitions}</p>

            </div>
        </div>
    );
}