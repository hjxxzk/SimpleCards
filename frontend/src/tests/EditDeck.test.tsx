import '@testing-library/jest-dom'
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EditView from '../components/EditView/EditView';
import { Decks } from './mock/Decks.mock';
import { cards } from './mock/Card.mock';

describe('edit deck should work', () => {

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

    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const DECKS = import.meta.env.VITE_DECKS;
    const CARDS = import.meta.env.VITE_CARDS;

    localStorage.setItem("accessToken", "mocked-token");
    const mockedDeck = Decks[0];
    const mockedCards = cards;
    vi.stubGlobal('fetch', vi.fn((url) => {
        if (url === `${DB_ADDRESS}${CARDS}?search=undefined`) {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({ mockedCards }),
            } as Response);

        }

        if (url === `${DB_ADDRESS}${DECKS}undefined`) {
            return Promise.resolve({
                ok: true,
                status: 201,
                json: async () => ({ mockedDeck }),
            } as Response);
        }

        return Promise.reject(new Error('Unknown URL'));
    }));


    it('edit deck data', () => {
        expect(screen.getByText("Deck Name")).toBeInTheDocument();
        expect(screen.getByText("Deck Description")).toBeInTheDocument();
        expect(screen.getByText("Source Language")).toBeInTheDocument();
        expect(screen.getByText("Translation Language")).toBeInTheDocument();
    });

})