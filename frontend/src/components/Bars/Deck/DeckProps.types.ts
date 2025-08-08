export interface DeckProps {
    _id: number;
    user_id: number;
    name: string;
    description: string;
    sourceLanguage: string;
    translationLanguage: string;
    numberOfRepetitions: number,
    knownPercent?: string;
    deleteDeck?: (deckId: number) => void;
}
