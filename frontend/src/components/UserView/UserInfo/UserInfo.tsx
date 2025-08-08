import { CircleUserRound } from "lucide-react";
import type { UserInfoProps } from "./UserInfo.types";


export const UserInfo = (props: UserInfoProps) => {

    const nickname = localStorage.getItem("nickname");

    return (
        <div className="w-4/5 sm:min-w-1/2 items-center mt-30 p-4 md:p-10 flex flex-col rounded-lg bg-neutral-200 text-lg sm:items-start">
            <div className="w-full flex gap-5 text-xl mb-5">
                <CircleUserRound color="#000" size={25} />
                <strong>Hi, {nickname}! Here you can find your current progress...</strong>
            </div>
            <p><strong>Decks repeated: </strong> {props.numberOfRepetitions}</p>
            <p><strong>Cards learned: </strong>{props.numberOfCardsLearned}</p>
        </div>
    );
}