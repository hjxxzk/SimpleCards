import { useState } from 'react';
import useStyles from "./Sidebar.styles";
import NewDeck from "../NewDeck/NewDeck";
import { mockedDeck } from "../Deck/Deck.mock";
import type { DeckProps } from "../Deck/DeckProps.types";
import Deck from "../Deck/Deck";
import DeleteDeckPopup from '../DeleteDeckPopup/DeleteDeckPopup';

const Sidebar = () => {

    const styles = useStyles();
    const [decks, setDecks] = useState<DeckProps[]>(mockedDeck);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [deckToBeDeletedId, setDeckToBeDeletedId] = useState<number>();

    function handleDeleteDeck(deckId: number) {
        setPopupVisible(true);
        setDeckToBeDeletedId(deckId);
    }

    function closePopup() {
        setPopupVisible(false);
    }

    function confirmDeleteDeck() {
        if (deckToBeDeletedId !== undefined) {
            setDecks(decks.filter(deck => deck.id !== deckToBeDeletedId));
        }
        closePopup();
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
            {isPopupVisible && <DeleteDeckPopup handleYes={confirmDeleteDeck} handleNo={closePopup} />}
        </div >
    );
}

export default Sidebar;