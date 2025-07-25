export interface DeckProps {
    _id: number;
    name: string;
    description: string;
    sourceLanguage: string;
    translationLanguage: string;
    deleteDeck?: (deckId: number) => void;
}
