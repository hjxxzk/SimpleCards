import { useState, useEffect } from 'react';
import useStyles from "./Sidebar.styles";
import NewElement from "../NewElement/NewElement";
import type { DeckProps } from "../Deck/DeckProps.types";
import Deck from "../Deck/Deck";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchNewToken } from '../../../services/AuthService';

const Sidebar = () => {

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;
    const CREATE_DECK_PAGE = "/create";
    const HOME_PAGE = "/";
    const [decks, setDecks] = useState<DeckProps[]>();
    const styles = useStyles();
    const navigate = useNavigate()
    const params = useParams();

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
            .then(() => navigateAfterDeletion(deckId))
            .catch(err => console.error('Error:', err));

    }

    function navigateAfterDeletion(deckId: number) {
        if (params.id === deckId.toString()) {
            navigate(HOME_PAGE);
        }
    }

    function handleAddDeck() {
        navigate(CREATE_DECK_PAGE);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchNewToken();

                const response = await fetch(`${DB_ADDRESS}${DECKS}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setDecks(data.reverse());
            } catch (error) {
                console.error('Error fetching decks:', error);
            }
        };

        fetchData();
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
                        numberOfRepetitions={deck.numberOfRepetitions}
                    />
                ))}
                {!decks && <p className={styles.text}>Start by adding your first deck!</p>}
            </div >
        </div >
    );
}

export default Sidebar;