export interface CardProps {
    _id: string;
    word: string;
    translation: string;
    isRemembered: boolean,
    deck_id?: number;
    deleteCard?: (cardId: string) => void;
}
