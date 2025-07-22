import { expect, describe, it, vi } from 'vitest'
import { cards } from './CardReviewService.mock'
import { addCardToRepeatInRandomPlace } from '../services/CardReviewService'

describe('add not remembered card to another review', () => {

    it('handles the deck with one item', () => {
        const deckWithOnlyOneItem = cards.slice(0, 1);
        const notRememberedCard = deckWithOnlyOneItem[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithOnlyOneItem)
        console.log(adjustedDeck)
        expect(adjustedDeck).toHaveLength(2)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[1])
    })

    it('handles the deck with two items', () => {
        const deckWithTwoItems = cards.slice(0, 2);
        const notRememberedCard = deckWithTwoItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithTwoItems)
        expect(adjustedDeck).toHaveLength(3)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[2])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[0])
    })

    it('handles the deck with two items - second card was wrong', () => {
        const deckWithTwoItems = cards.slice(0, 2);
        const notRememberedCard = deckWithTwoItems[1]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithTwoItems)
        expect(adjustedDeck).toHaveLength(3)
        expect(adjustedDeck[1]).toEqual(adjustedDeck[2])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[0])
    })

    it('handles the deck with three items - first item wrong, chosen fourth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.70);
        const deckWithThreeItems = cards.slice(0, 3);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(4)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[3])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[2])
        vi.restoreAllMocks()
    })

    it('handles the deck with three items - first item wrong, chosen third position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.01);
        const deckWithThreeItems = cards.slice(0, 3);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(4)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[3])
        vi.restoreAllMocks()
    })

    it('handles the deck with three items - second item wrong', () => {
        const deckWithThreeItems = cards.slice(0, 3);
        const notRememberedCard = deckWithThreeItems[1]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(4)
        expect(adjustedDeck[1]).toEqual(adjustedDeck[3])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
    })

    it('handles the deck with three items - last item wrong', () => {
        const deckWithThreeItems = cards.slice(0, 3);
        const notRememberedCard = deckWithThreeItems[2]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(4)
        expect(adjustedDeck[2]).toEqual(adjustedDeck[3])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[2])
    })

    it('handles the deck with four items - first item wrong, chosen third position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.01);
        const deckWithThreeItems = cards.slice(0, 4);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(5)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[3])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[4])
        vi.restoreAllMocks()
    })

    it('handles the deck with four items - first item wrong, chosen fourth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.45);
        const deckWithThreeItems = cards.slice(0, 4);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(5)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[3])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[4])
        vi.restoreAllMocks()
    })

    it('handles the deck with four items - first item wrong, chosen fifth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.99);
        const deckWithThreeItems = cards.slice(0, 4);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(5)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[4])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[3])
        vi.restoreAllMocks()
    })

    it('handles the deck with four items - second item wrong, chosen fourth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.01);
        const deckWithThreeItems = cards.slice(0, 4);
        const notRememberedCard = deckWithThreeItems[1]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(5)
        expect(adjustedDeck[1]).toEqual(adjustedDeck[3])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[0])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[4])
        vi.restoreAllMocks()
    })

    it('handles the deck with four items - second item wrong, chosen fifth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.99);
        const deckWithThreeItems = cards.slice(0, 4);
        const notRememberedCard = deckWithThreeItems[1]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(5)
        expect(adjustedDeck[1]).toEqual(adjustedDeck[4])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[0])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[3])
        vi.restoreAllMocks()
    })

    it('handles the deck with four items - third item wrong, chosen fifth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.99);
        const deckWithThreeItems = cards.slice(0, 4);
        const notRememberedCard = deckWithThreeItems[2]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(5)
        expect(adjustedDeck[2]).toEqual(adjustedDeck[4])
        expect(adjustedDeck[2]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[2]).not.toEqual(adjustedDeck[0])
        expect(adjustedDeck[2]).not.toEqual(adjustedDeck[3])
        vi.restoreAllMocks()
    })


    it('handles the deck with five items - first item wrong, chosen sixth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.99);
        const deckWithThreeItems = cards.slice(0, 5);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(6)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[5])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[3])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[4])
        vi.restoreAllMocks()
    })

    it('handles the deck with five items - first item wrong, chosen fifth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.45);
        const deckWithThreeItems = cards.slice(0, 5);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(6)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[4])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[3])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[5])
        vi.restoreAllMocks()
    })

    it('handles the deck with five items - first item wrong, chosen fourth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.01);
        const deckWithThreeItems = cards.slice(0, 5);
        const notRememberedCard = deckWithThreeItems[0]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(6)
        expect(adjustedDeck[0]).toEqual(adjustedDeck[3])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[4])
        expect(adjustedDeck[0]).not.toEqual(adjustedDeck[5])
        vi.restoreAllMocks()
    })

    it('handles the deck with five items - second item wrong, chosen fourth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.01);
        const deckWithThreeItems = cards.slice(0, 5);
        const notRememberedCard = deckWithThreeItems[1]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(6)
        expect(adjustedDeck[1]).toEqual(adjustedDeck[3])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[6])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[4])
        expect(adjustedDeck[1]).not.toEqual(adjustedDeck[5])
        vi.restoreAllMocks()
    })

    it('handles the deck with five items - third item wrong, chosen fourth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.01);
        const deckWithThreeItems = cards.slice(0, 5);
        const notRememberedCard = deckWithThreeItems[2]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(6)
        expect(adjustedDeck[2]).toEqual(adjustedDeck[4])
        expect(adjustedDeck[2]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[2]).not.toEqual(adjustedDeck[6])
        expect(adjustedDeck[2]).not.toEqual(adjustedDeck[3])
        expect(adjustedDeck[2]).not.toEqual(adjustedDeck[5])
        vi.restoreAllMocks()
    })

    it('handles the deck with five items - fourth item wrong, chosen fourth position', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.01);
        const deckWithThreeItems = cards.slice(0, 5);
        const notRememberedCard = deckWithThreeItems[3]
        const adjustedDeck = addCardToRepeatInRandomPlace(notRememberedCard, deckWithThreeItems)
        expect(adjustedDeck).toHaveLength(6)
        expect(adjustedDeck[3]).toEqual(adjustedDeck[5])
        expect(adjustedDeck[3]).not.toEqual(adjustedDeck[1])
        expect(adjustedDeck[3]).not.toEqual(adjustedDeck[2])
        expect(adjustedDeck[3]).not.toEqual(adjustedDeck[4])
        expect(adjustedDeck[3]).not.toEqual(adjustedDeck[0])
        vi.restoreAllMocks()
    })

})