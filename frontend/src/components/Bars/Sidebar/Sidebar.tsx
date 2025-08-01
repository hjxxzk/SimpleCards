import { useState, useEffect } from 'react';
import useStyles from "./Sidebar.styles";
import NewElement from "../NewElement/NewElement";
import type { DeckProps } from "../Deck/DeckProps.types";
import Deck from "../Deck/Deck";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;
    const CREATE_DECK_PAGE = "/create";
    const [decks, setDecks] = useState<DeckProps[]>();
    const styles = useStyles();
    const navigate = useNavigate()

    function handleDeleteDeck(deckId: number) {
        if (decks) {
            setDecks(decks.filter(deck => deck._id !== deckId));
            requestDelete(deckId);
        }
    }

    function requestDelete(deckId: number) {
        fetch(`${DB_ADDRESS}${DECKS}${deckId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(res => res.json())
            .catch(err => console.error('Error:', err));

    }

    function handleAddDeck() {
        navigate(CREATE_DECK_PAGE);
    }

    useEffect(() => {
        fetch(`${DB_ADDRESS}${DECKS}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(dane => setDecks(dane.reverse()))
            .catch(err => console.error('Error:', err));
    }, []);


    return (
        <div className={styles.sidebar}>
            <strong>Your Decks:</strong>
            <hr className={styles.separator} />
            <div className={styles.decksList}>
                <NewElement navigate={handleAddDeck} />
                {decks && decks.map((deck) => (
                    <Deck
                        key={deck._id}
                        _id={deck._id}
                        name={deck.name}
                        description={deck.description}
                        sourceLanguage={deck.sourceLanguage}
                        translationLanguage={deck.translationLanguage}
                        user_id={deck.user_id}
                        deleteDeck={handleDeleteDeck}
                    />
                ))}
                {!decks && <p className={styles.text}>Start by adding your first deck!</p>}
            </div >
        </div >
    );
}

export default Sidebar;