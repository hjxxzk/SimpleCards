import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateCard from './CreateCard';

describe('should fetch cards for editing', () => {

    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
                reload: vi.fn(),
            },
            writable: true,
        });

        render(
            <CreateCard deck_id='1' />
        );
    });

    localStorage.setItem("accessToken", "mocked-token");
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ id: "1" }),
    } as Response);

    it("validate static elements", async () => {
        await waitFor(() => {
            expect(screen.getByText("Word:")).toBeInTheDocument()
            expect(screen.getByText("Translation:")).toBeInTheDocument()
            expect(screen.queryByText("SAVE")).not.toBeInTheDocument()
        });
    });

    it("validate save card request", async () => {
        await waitFor(() => {
            const wordInput = screen.getByPlaceholderText("Word here");
            const translationInput = screen.getByPlaceholderText("Translation here");
            fireEvent.change(wordInput, { target: { value: 'cat' } });
            fireEvent.change(translationInput, { target: { value: "kot" } });
            expect(screen.getByDisplayValue("cat")).toBeInTheDocument()
            expect(screen.getByDisplayValue("kot")).toBeInTheDocument()
            const saveButton = screen.getByText("SAVE");
            fireEvent.click(saveButton);

            expect(fetchSpy).toHaveBeenCalled();
            expect(fetchSpy).toHaveBeenCalledWith(
                'http://localhost:5000/api/cards',
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer mocked-token`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        word: "cat",
                        translation: "kot",
                        deck_id: "1"
                    })
                },
            )
        });
    });
})