import { useState } from 'react';
import useStyles from "./Sidebar.styles";
import NewDeck from "../NewDeck/NewDeck";
import { mockedDeck } from "../Deck/Deck.mock";
import type { DeckProps } from "../Deck/DeckProps.types";
import Deck from "../Deck/Deck";

const Sidebar = () => {

    const styles = useStyles();
    const [decks, setDecks] = useState<DeckProps[]>(mockedDeck);

    function handleDeleteDeck(deckId: number) {
        setDecks(decks.filter(deck => deck.id !== deckId));
    }

    return (
        <div className={styles.sidebar}>
            <strong>Your Decks:</strong>
            <hr className={styles.separator} />
            <div className={styles.decksList}>
                <NewDeck />
                {decks.map((deck) => (
                    <Deck
                        key={deck.id}
                        id={deck.id}
                        name={deck.name}
                        description={deck.description}
                        sourceLanguage={deck.sourceLanguage}
                        translationLanguage={deck.translationLanguage}
                        deleteDeck={handleDeleteDeck}
                    />
                ))}
            </div >
        </div >
    );
}

export default Sidebar;