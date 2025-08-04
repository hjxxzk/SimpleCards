import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Layout from '../Layout';
import { BrowserRouter } from 'react-router-dom';
import { Decks } from './mock/Decks.mock';

describe("starting screen elements should load", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        );
    });
    afterEach(() => {
        vi.clearAllMocks();
    });

    const mockedDecks = Decks.sort((a, b) => a._id - b._id);
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockedDecks)
    })
    ));

    localStorage.setItem("accessToken", "mocked-token");

    it("fetch the data", async () => {
        expect(window.location.pathname).toBe('/')

        await waitFor(() => {
            mockedDecks.forEach(deck => {
                expect(screen.getByText(deck.name)).toBeInTheDocument()
                expect(screen.getByText(deck.description)).toBeInTheDocument()
                expect(screen.getByText((content) => content.includes(`${deck.sourceLanguage} | ${deck.translationLanguage}`))).to.exist
            })
        });

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:5000/api/decks/',
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer mocked-token`,
                    "Content-Type": 'application/json'
                },
            },
        )
    });

    it("check static text and static elements", async () => {
        expect(screen.getByText("Your Decks:")).toBeInTheDocument();
        expect(screen.getByText("Start by adding your first deck!")).toBeInTheDocument();

        expect(screen.getByTestId('logo-image')).toBeInTheDocument()
        expect(screen.getByTestId('user-icon')).toBeInTheDocument()
    })

    it("check rediraction to userView", async () => {
        const userLogo = screen.getByTestId('user-icon');
        await userEvent.click(userLogo);
        expect(window.location.pathname).toBe('/user')
    })

    mockedDecks.forEach((deck) => {
        it(`redirects to ${deck.name} after clicking ${deck.name}`, async () => {
            render(
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            )
            const deckElement = await screen.findByText(deck.name)
            await userEvent.click(deckElement)
            await waitFor(() => {
                expect(window.location.pathname).toBe(`/${deck._id}`)
            })
        })
    })

    async function openPopUp() {
        const deckElement = await screen.findByText(mockedDecks[0].name);
        await userEvent.hover(deckElement);
        const deleteButtons = await screen.findAllByTestId('trash-icon');
        await userEvent.click(deleteButtons[0]);
    }

    it('opens delete deck popup and validates content', async () => {
        await openPopUp();
        expect(screen.getByText("Delete Deck")).toBeInTheDocument();
        expect(screen.getByText("Do you want to delete this deck?")).toBeInTheDocument();

    })

    it('opens delete deck popup and does not delete the deck', async () => {
        await openPopUp();
        expect(screen.findByText("Delete Deck")).toBeDefined();
        const noButton = screen.getByText("NO");
        await userEvent.click(noButton);
        const deckElements = screen.getAllByTestId("deck")
        expect(deckElements).toHaveLength(mockedDecks.length)
    })

    it('opens delete deck popup and does delete the deck', async () => {
        await openPopUp();
        expect(screen.findByText("Delete Deck")).toBeDefined();
        const noButton = screen.getByText("YES");
        await userEvent.click(noButton);
        const deckElements = screen.getAllByTestId("deck")
        expect(deckElements).toHaveLength(mockedDecks.length - 1)
    })

    mockedDecks.forEach((deck) => {
        it(`redirects to edit deck ${deck.name} after clicking pencil icon`, async () => {
            render(
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            )
            const deckElement = await screen.findByText(deck.name);
            await userEvent.hover(deckElement);
            const editButton = await screen.findAllByTestId('pencil-icon');
            await userEvent.click(editButton[deck._id - 1]);
            await waitFor(() => {
                expect(window.location.pathname).toBe(`/edit/${deck._id}`)
            })
        })
    })

});