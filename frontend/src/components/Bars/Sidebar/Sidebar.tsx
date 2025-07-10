import { useState, useEffect } from 'react';
import useStyles from "./Sidebar.styles";
import NewDeck from "../NewDeck/NewDeck";
import type { DeckProps } from "../Deck/DeckProps.types";
import Deck from "../Deck/Deck";

const Sidebar = () => {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;
    const styles = useStyles();
    const [decks, setDecks] = useState<DeckProps[]>();

    function handleDeleteDeck(deckId: number) {
        if (decks) {
            setDecks(decks.filter(deck => deck._id !== deckId));
            requestDelete(deckId);
        }
    }

    function requestDelete(deckId: number) {
        fetch(`${DB_ADDRESS}${DECKS}${deckId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(err => console.error('Error:', err));

    }

    useEffect(() => {
        fetch(`${DB_ADDRESS}${DECKS}`)
            .then(res => res.json())
            .then(dane => setDecks(dane))
            .catch(err => console.error('Error:', err));
    }, []);


    return (
        <div className={styles.sidebar}>
            <strong>Your Decks:</strong>
            <hr className={styles.separator} />
            <div className={styles.decksList}>
                <NewDeck />
                {decks && decks.map((deck) => (
                    <Deck
                        key={deck._id}
                        _id={deck._id}
                        name={deck.name}
                        description={deck.description}
                        sourceLanguage={deck.sourceLanguage}
                        translationLanguage={deck.translationLanguage}
                        deleteDeck={handleDeleteDeck}
                    />
                ))}
                {!decks && <p className={styles.text}>Start by adding your first deck!</p>}
            </div >
        </div >
    );
}

export default Sidebar;