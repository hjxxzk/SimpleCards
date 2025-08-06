import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditCard from './EditCard';
import type { CardProps } from '../Card/CardProps.types';

describe('should fetch cards for editing', () => {

    const card: CardProps = {
        _id: 1,
        word: "cat",
        translation: "kot",
    }


    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
                reload: vi.fn(),
            },
            writable: true,
        });

        render(
            <EditCard card={card} />
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
            expect(screen.getByDisplayValue("cat")).toBeInTheDocument()
            expect(screen.getByText("Translation:")).toBeInTheDocument()
            expect(screen.getByDisplayValue("kot")).toBeInTheDocument()
            expect(screen.queryByText("SAVE")).not.toBeInTheDocument()
        });
    });

    it("validate edit card request", async () => {
        await waitFor(() => {
            const wordInput = screen.getByPlaceholderText("Word here");
            const translationInput = screen.getByPlaceholderText("Translation here");
            fireEvent.change(wordInput, { target: { value: 'kitty' } });
            fireEvent.change(translationInput, { target: { value: "kotek" } });
            expect(screen.getByDisplayValue("kitty")).toBeInTheDocument()
            expect(screen.getByDisplayValue("kotek")).toBeInTheDocument()
            const saveButton = screen.getByText("SAVE");
            fireEvent.click(saveButton);

            const updatedCard: CardProps = {
                _id: 1,
                word: "kitty",
                translation: "kotek",
            }

            expect(fetchSpy).toHaveBeenCalled();
            expect(fetchSpy).toHaveBeenCalledWith(
                'http://localhost:5000/api/cards/1',
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer mocked-token`,
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        updatedCard: updatedCard
                    })
                },
            )
        });
    });
})