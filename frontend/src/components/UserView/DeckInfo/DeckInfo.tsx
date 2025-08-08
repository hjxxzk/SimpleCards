import { useEffect, useState } from "react";
import type { DeckProps } from "../../Bars/Deck/DeckProps.types";
import useStyles from "./DeckInfo.styles";

export const DeckInfo = (props: DeckProps) => {

    const styles = useStyles();

    const [width, setWidth] = useState("0%");

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (props.knownPercent) {
                setWidth(props.knownPercent);
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [props.knownPercent]);



    return (
        <div className={styles.deckContainer} data-testid="deck">
            <div className={styles.deck} >
                <div style={{ width: width }}
                    className={styles.progressBar}></div>
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