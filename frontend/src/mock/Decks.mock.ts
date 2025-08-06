import type { DeckProps } from "../components/Bars/Deck/DeckProps.types"

export const Decks: DeckProps[] = [
    {
        _id: 1,
        user_id: 1,
        name: "Deck1",
        description: "Deck for testing purposes",
        sourceLanguage: "en",
        translationLanguage: "pl"
    },
    {
        _id: 2,
        user_id: 1,
        name: "Deck2",
        description: "Second deck for testing purposes",
        sourceLanguage: "es",
        translationLanguage: "pl"
    },
    {
        _id: 3,
        user_id: 1,
        name: "Deck3",
        description: "Third deck for testing purposes",
        sourceLanguage: "fr",
        translationLanguage: "pl"
    }
]