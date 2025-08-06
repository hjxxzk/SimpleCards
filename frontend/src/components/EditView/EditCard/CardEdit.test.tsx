import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EditView from '../EditView';
import { cards } from '../../../mock/Card.mock';
import type { CardProps } from '../Card/CardProps.types';

describe('should fetch cards for editing', () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <EditView />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    })

    localStorage.setItem("accessToken", "mocked-token");
    const mockedCards: CardProps[] = cards;

    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockedCards)
    })
    ));

    it('validate fetched cards', async () => {
        await waitFor(() => {
            expect(screen.getAllByText("cat")[0]).toBeInTheDocument();
            expect(screen.getAllByText("dog")[0]).toBeInTheDocument();
            expect(screen.getAllByText("cow")[0]).toBeInTheDocument();
            expect(screen.queryByText("donkey")).not.toBeInTheDocument();
        });
    });

    async function openPopUp() {
        const cardElement = await screen.getAllByText("cat")[0];
        await userEvent.hover(cardElement)
        const deleteButtons = await screen.findAllByTestId('trash-icon');
        expect(deleteButtons[0]).toBeInTheDocument();
        await userEvent.click(deleteButtons[0]);
    }

    it('opens delete popup for a card', async () => {
        await waitFor(async () => {
            expect(screen.getAllByText("cat")[0]).toBeInTheDocument();
            await openPopUp();
            expect(screen.getByText("Delete Card")).toBeInTheDocument();
            expect(screen.getByText("Delete?")).toBeInTheDocument();
        });
    })

    it('opens popup and does not delete card', async () => {
        await waitFor(async () => {
            await openPopUp();
            expect(screen.findByText("Delete Card")).toBeDefined();
            const noButton = screen.getAllByText("NO");
            await userEvent.click(noButton[0]);
            const deckElements = screen.getAllByTestId("card")
            expect(deckElements).toHaveLength(cards.length)
        })
    })

})