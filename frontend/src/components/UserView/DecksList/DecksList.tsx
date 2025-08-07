import { useState } from "react";
import type { DeckProps } from "../../Bars/Deck/DeckProps.types";
import { DeckInfo } from "../DeckInfo/DeckInfo";

export const DecksList = () => {

    const [decks, setDecks] = useState<DeckProps[]>();

    return (
        <div className="max-w-4/5 items-center sm:min-w-1/2 mt-30 p-4 md:p-10 flex flex-col rounded-lg bg-neutral-200 text-lg sm:items-start ">

            <DeckInfo></DeckInfo>
        </div>
    );
}