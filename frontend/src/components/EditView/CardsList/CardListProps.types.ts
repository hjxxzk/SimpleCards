import type { CardProps } from "../Card/CardProps.types";

export interface CardListProps {
    cards: CardProps[],
    deleteCard: (cardId: number) => void
}