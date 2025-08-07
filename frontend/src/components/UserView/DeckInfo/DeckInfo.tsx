import useStyles from "./DeckInfo.styles";

export const DeckInfo = () => {

    const styles = useStyles();

    return (
        <div className={styles.deckContainer} data-testid="deck">
            <div className={styles.deck} >
                <div className={styles.deckHeader}>
                    <strong>Deck 1</strong>
                </div>
                <hr className={styles.separator} />
                <p>Cards known: 50%</p>
                <p>Number of repetitions: 50</p>

            </div>
        </div>
    );
}