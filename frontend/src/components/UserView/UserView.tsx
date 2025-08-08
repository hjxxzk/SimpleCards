import { useEffect, useState } from "react";
import { refreshToken } from "../../services/AuthService";
import { UserBar } from "./UserBar/UserBar";
import { UserInfo } from "./UserInfo/UserInfo";
import { useStyles } from "./UserView.styles";
import type { DeckProps } from "../Bars/Deck/DeckProps.types";
import { DeckInfo } from "./DeckInfo/DeckInfo";
import type { CardProps } from "../EditView/Card/CardProps.types";

const UserView = () => {

    const styles = useStyles()
    refreshToken();
    const [decks, setDecks] = useState<DeckProps[]>();
    const [cards, setCards] = useState<CardProps[]>([]);
    const [deckData, setDecksData] = useState<Map<number, string>>(new Map());
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;
    const CARDS = import.meta.env.VITE_CARDS;

    useEffect(() => {
        const fetchDecks = async () => {
            try {
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
                const reversedDecks: DeckProps[] = data.reverse();
                const decksMap = new Map<number, string>();
                setDecks(reversedDecks);
                const fetchPromises = reversedDecks.map((deck) => {
                    decksMap.set(deck._id, "");
                    return fetchCards(deck._id);
                });

                const allDeckCards = await Promise.all(fetchPromises);
                const allCards = allDeckCards.flat();
                setCards(allCards);
                countKnownCardsInGivenDeck(decksMap, allCards);
            } catch (error) {
                console.error('Error fetching decks:', error);
            }
        };

        const fetchCards = async (deckId: number) => {
            try {
                const response = await fetch(`${DB_ADDRESS}${CARDS}?search=${deckId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` } });
                const data = await response.json();
                return data;
            } catch (err) {
                console.error('Error:', err);
            }
        }

        fetchDecks();

    }, []);

    function countRepeatedDecks(): string {
        let numberOfRepetitions: number = 0;
        decks?.forEach((deck) => numberOfRepetitions += Number(deck.numberOfRepetitions));
        return numberOfRepetitions.toString();
    }

    function countCardsLearned(): string {
        return cards.filter((card) => card.isRemembered).length.toString();
    }

    function countKnownCardsInGivenDeck(decksMap: Map<number, string>, cards: CardProps[]) {
        decksMap.forEach((_, deck_id) => {
            let deckCount = 0;
            let knownCount = 0;
            cards.forEach((card) => {
                if (card.deck_id === deck_id) {
                    deckCount++;
                    if (card.isRemembered) {
                        knownCount++;
                    }
                }
            });
            const knownPercent = deckCount > 0 ? (knownCount / deckCount * 100).toFixed(0) + "%" : "N/A";
            decksMap.set(deck_id, knownPercent);
        });
        setDecksData(decksMap);
    }

    return (
        <div className={styles.container}>
            <UserBar />
            <UserInfo numberOfRepetitions={countRepeatedDecks()} numberOfCardsLearned={countCardsLearned()} />
            {(decks ?? []).length > 0 && <div className={styles.decksList}>
                {decks?.map((deck) => (
                    <DeckInfo
                        key={deck._id}
                        _id={deck._id}
                        name={deck.name}
                        description={deck.description}
                        sourceLanguage={deck.sourceLanguage}
                        translationLanguage={deck.translationLanguage}
                        user_id={deck.user_id}
                        numberOfRepetitions={deck.numberOfRepetitions}
                        knownPercent={deckData.get(deck._id)}
                    />
                ))}
            </div>}
        </div>
    );
}

export default UserView;