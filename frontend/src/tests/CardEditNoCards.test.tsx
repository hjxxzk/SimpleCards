import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EditView from '../components/EditView/EditView';
import type { CardProps } from '../components/EditView/Card/CardProps.types';

describe('should prompt to add cards when no cards are added', () => {

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
    const mockedCards: CardProps[] = [];

    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockedCards)
    })
    ));

    it('validate fetched cards', async () => {
        await waitFor(() => {
            expect(screen.queryByText("Start by adding your first card!!!!")).not.toBeInTheDocument();
            expect(screen.getByText("Start by adding your first card!")).toBeInTheDocument();
        });

    });
})