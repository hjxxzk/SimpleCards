export interface CardProps {
    _id: number;
    word: string;
    translation: string;
    deck_id?: number;
    deleteCard?: (cardId: number) => void;
}
