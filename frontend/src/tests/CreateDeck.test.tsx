import '@testing-library/jest-dom'
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateDeck from '../components/CreateDeckView/CreateDeckView.tsx'

describe('CreateDeck component inputs test', () => {

    beforeEach(() => {
        render(
            <CreateDeck />
        );
    });

    const mockNavigate = vi.fn();
    vi.mock('react-router-dom', () => ({
        useNavigate: () => mockNavigate,
    }));

    localStorage.setItem("accessToken", "mocked-token");
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: "1" }),
    } as Response);

    vi.stubGlobal('location', {
        ...window.location,
        assign: vi.fn(),
    });


    const LANGUAGES = ["English", "Polish", "Spanish", "French", "German", "Chinese", "Japanese"];

    it('should allow typing into input and textarea and reflect the entered text', () => {
        expect(screen.getByText("Deck Name")).toBeInTheDocument();
        expect(screen.getByText("Deck Description")).toBeInTheDocument();
        expect(screen.getByText("Source Language")).toBeInTheDocument();
        expect(screen.getByText("Translation Language")).toBeInTheDocument();

        const deckNameInput = screen.getByPlaceholderText('My Deck');
        const descriptionTextarea = screen.getByPlaceholderText('Deck to learn a new language');
        fireEvent.change(deckNameInput, { target: { value: 'My Awesome Deck' } });
        expect(deckNameInput).toHaveValue('My Awesome Deck');
        fireEvent.change(descriptionTextarea, { target: { value: 'This deck is for testing purposes.' } });
        expect(descriptionTextarea).toHaveValue('This deck is for testing purposes.');
    });

    it('should display all languages and change source language', async () => {
        const sourceLanguagePicker = screen.getByText('English');
        fireEvent.click(sourceLanguagePicker)
        LANGUAGES.forEach(language => {
            expect(screen.getAllByText(language)[0]).toBeInTheDocument()
        })
        fireEvent.click(screen.getAllByText(LANGUAGES[2])[0])
        expect(sourceLanguagePicker.textContent).toBe(LANGUAGES[2]);
    });

    it('should display all languages and change translation language', async () => {
        const translationLanguagePicker = screen.getByText('Polish');
        fireEvent.click(translationLanguagePicker)
        LANGUAGES.forEach(language => {
            expect(screen.getAllByText(language)[0]).toBeInTheDocument()
        })
        fireEvent.click(screen.getAllByText(LANGUAGES[2])[0]);
        expect(translationLanguagePicker.textContent).toBe(LANGUAGES[2]);
    });

    it('should not fire save event when all fields are not filled', async () => {
        const alertMock = vi.fn();
        vi.stubGlobal('alert', alertMock);
        const createButton = screen.getByText('CREATE DECK');
        fireEvent.click(createButton);
        await Promise.resolve();
        expect(fetchSpy).not.toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledWith('Please fill all of the fields');

    });

    it('should fire save event when all fields are filled', async () => {
        const deckNameInput = screen.getByPlaceholderText("My Deck");
        fireEvent.change(deckNameInput, { target: { value: "My Awesome Deck" } });
        const descriptionTextarea = screen.getByPlaceholderText("Deck to learn a new language");
        fireEvent.change(descriptionTextarea, { target: { value: 'This deck is for testing purposes.' } });
        const createButton = screen.getByText('CREATE DECK');
        fireEvent.click(createButton);
        await Promise.resolve();
        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy).toHaveBeenCalledWith(
            'http://localhost:5000/api/decks/',
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer mocked-token`,
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    name: "My Awesome Deck",
                    description: "This deck is for testing purposes.",
                    sourceLanguage: "en",
                    translationLanguage: "pl"
                })
            },
        )
    });
});