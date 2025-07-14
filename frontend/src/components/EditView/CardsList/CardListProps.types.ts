import type { CardProps } from "../Card/CardProps.types";

export interface CardListProps {
    cards: CardProps[],
    chooseCardToEdit: (cardId: number) => void,
    deleteCard: (cardId: number) => void
}