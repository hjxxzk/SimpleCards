import type { CardProps } from "../Card/CardProps.types";

export interface CardListProps {
    cards: CardProps[],
    chooseCardToEdit: (cardId: string) => void,
    deleteCard: (cardId: string) => void,
    addCard: () => void,
}