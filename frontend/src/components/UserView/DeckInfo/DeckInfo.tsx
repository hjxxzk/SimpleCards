import type { DeckProps } from "../../Bars/Deck/DeckProps.types";
import useStyles from "./DeckInfo.styles";

export const DeckInfo = (props: DeckProps) => {

    const styles = useStyles();

    return (
        <div className={styles.deckContainer} data-testid="deck">
            <div className={styles.deck} >
                <div className={styles.deckHeader}>
                    <strong>{props.name}</strong>
                </div>
                <hr className={styles.separator} />
                <p>Cards known: {props.knownPercent}</p>
                <p>Number of repetitions: {props.numberOfRepetitions}</p>

            </div>
        </div>
    );
}