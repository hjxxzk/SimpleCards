import { CircleUserRound } from "lucide-react";
import type { UserInfoProps } from "./UserInfo.types";
import { useStyles } from "./UserInfo.styles";


export const UserInfo = (props: UserInfoProps) => {

    const nickname = localStorage.getItem("nickname");
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.textArea}>
                <CircleUserRound color="#000" size={25} />
                <strong>Hi, {nickname}! Here you can find your current progress...</strong>
            </div>
            <p><strong>Decks repeated: </strong> {props.numberOfRepetitions}</p>
            <p><strong>Cards learned: </strong>{props.numberOfCardsLearned}</p>
        </div >
    );
}