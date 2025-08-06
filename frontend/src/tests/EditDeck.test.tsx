import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EditDeck from '../components/EditView/EditDeck/EditDeck';
import { Decks } from './mock/Decks.mock';

describe('should fetch cards for editing', () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <EditDeck />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    })

    const mockedDecks = Decks[0];
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockedDecks)
    })
    ));

    localStorage.setItem("accessToken", "mocked-token");

    it("fetch the data", async () => {
        expect(window.location.pathname).toBe('/')

        await waitFor(() => {
            expect(screen.getByText("Deck Name")).toBeInTheDocument()
            expect(screen.getByText("Deck Description")).toBeInTheDocument()
            expect(screen.getByText("Source Language")).toBeInTheDocument()
            expect(screen.getByText("Translation Language")).toBeInTheDocument()
            expect(screen.getByDisplayValue("Deck1")).toBeInTheDocument()
            expect(screen.getByDisplayValue("Deck for testing purposes")).toBeInTheDocument()
            expect(screen.queryByText("EDIT DECK")).not.toBeInTheDocument()
        });
    });

    it("validate edit request", async () => {
        await waitFor(() => {
            let descriptionTextarea = screen.getByPlaceholderText("Deck to learn a new language");
            let nameInput = screen.getByPlaceholderText("My Deck");
            fireEvent.change(descriptionTextarea, { target: { value: 'This deck is for learning purposes' } });
            fireEvent.change(nameInput, { target: { value: "Learning deck" } });
            expect(screen.getByDisplayValue("This deck is for learning purposes")).toBeInTheDocument()
            expect(screen.getByDisplayValue("Learning deck")).toBeInTheDocument()
            const editButton = screen.getByText("EDIT DECK");
            fireEvent.click(editButton);

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/api/decks/'),
                expect.objectContaining({
                    method: "PATCH",
                    headers: expect.objectContaining({
                        Authorization: expect.any(String),
                        "Content-Type": 'application/json'
                    }),
                    body: expect.any(String)
                })
            );
        });
    });

})