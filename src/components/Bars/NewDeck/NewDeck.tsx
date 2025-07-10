import useStyles from './NewDeck.styles';
import { Plus } from 'lucide-react';

const NewDeck = () => {

    const styles = useStyles();

    return (
        <div className={styles.newDeck}>
            <Plus color="black" size={24}></Plus>
        </div>
    );
}

export default NewDeck;