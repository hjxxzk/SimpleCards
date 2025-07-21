import type { CardProps } from "../components/EditView/Card/CardProps.types";

export function shuffleCards(cards: CardProps[]) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

const MINIMUM_NUMBER_OF_CARDS_TO_SWAP = 3;


export function addCardToRepeatInRandomPlace(cardToRepeat: CardProps, cards: CardProps[]): CardProps[] {

    const cardToRepeatIndex = cards.lastIndexOf(cardToRepeat);
    const middleOfCardsLeftToReview = cardToRepeatIndex + Math.ceil((cards.length - cardToRepeatIndex) / 2);
    const newRandomIndex = returnRandomIndexBetweenGivenEdgepoints(middleOfCardsLeftToReview, cards.length);

    cards.push(cardToRepeat);

    if (areThereEnoughCardsToSwapPlaces(cardToRepeatIndex, cards)) {
        return swapCardsToPutRepeatedCardOnNewRandomIndex(newRandomIndex, cards);
    } else {
        return cards;
    }
}

function swapCardsToPutRepeatedCardOnNewRandomIndex(chosenIndex: number, cards: CardProps[]): CardProps[] {
    for (let i = cards.length - 1; i > chosenIndex; i--) {
        [cards[i], cards[i - 1]] = [cards[i - 1], cards[i]];
    }
    return cards;
}

function areThereEnoughCardsToSwapPlaces(cardToRepeatIndex: number, cards: CardProps[]) {
    const numberOfCardsLeftToRepeat = (cards.length - 1) - cardToRepeatIndex;
    return numberOfCardsLeftToRepeat >= MINIMUM_NUMBER_OF_CARDS_TO_SWAP;
}

export function returnRandomIndexBetweenGivenEdgepoints(firstEdgepoint: number, secondEdgepoint: number) {
    return Math.round(Math.random() * (secondEdgepoint - firstEdgepoint + 1) + firstEdgepoint);
}