import { CircleUserRound } from "lucide-react";
import { useState } from "react";

export const UserInfo = () => {

    const [username, setUsername] = useState<string>('Admin');
    const [numberOfRepetitions, setNumberOfRepetitions] = useState<string>('5');
    const [numberOfCardsLearned, setNumberOfCardsLearned] = useState<string>('5');

    return (
        <div className="max-w-4/5 items-center sm:min-w-1/2 mt-30 p-4 md:p-10 flex flex-col rounded-lg bg-neutral-200 text-lg sm:items-start ">
            <div className="w-full flex gap-5 text-xl mb-5">
                <CircleUserRound color="#000" size={25} />
                <strong>Hi, {username}! Here you can find your current progress...</strong>
            </div>
            <p><strong>Decks repeated: </strong> {numberOfRepetitions}</p>
            <p><strong>Cards learned: </strong>{numberOfCardsLearned}</p>
        </div>
    );
}