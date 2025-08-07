import { useEffect, useState } from "react";
import type { DeckProps } from "../../Bars/Deck/DeckProps.types";
import { DeckInfo } from "../DeckInfo/DeckInfo";

export const DecksList = () => {

    const [decks, setDecks] = useState<DeckProps[]>();
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;

    useEffect(() => {
        const fetchData = async () => {
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
                setDecks(data.reverse());
                countRepeatedDecks();
                countCardsLearned();
            } catch (error) {
                console.error('Error fetching decks:', error);
            }
        };
        fetchData();
    }, []);

    function countRepeatedDecks() {

    }

    function countCardsLearned() {

    }

    return (
        <div className="max-w-4/5 items-center sm:min-w-1/2 mt-30 p-4 md:p-10 flex flex-col rounded-lg bg-neutral-200 text-lg sm:items-start ">
            {decks && decks.map((deck) => (
                <DeckInfo
                    key={deck._id}
                    _id={deck._id}
                    name={deck.name}
                    description={deck.description}
                    sourceLanguage={deck.sourceLanguage}
                    translationLanguage={deck.translationLanguage}
                    user_id={deck.user_id}
                    numberOfRepetitions={deck.numberOfRepetitions}
                />
            ))}
        </div>
    );
}