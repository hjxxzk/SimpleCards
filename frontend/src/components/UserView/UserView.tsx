import { DecksList } from "./DecksList/DecksList";
import { UserBar } from "./UserBar/UserBar";
import { UserInfo } from "./UserInfo/UserInfo";
import { useStyles } from "./UserView.styles";

const UserView = () => {

    const styles = useStyles()

    return (
        <div className={styles.container}>
            <UserBar />
            <UserInfo />
            <DecksList />
        </div>
    );
}

export default UserView;