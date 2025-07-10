import { useNavigate } from 'react-router-dom';
import useStyles from './NewDeck.styles';
import { Plus } from 'lucide-react';

const NewDeck = () => {

    const styles = useStyles();
    const navigate = useNavigate();

    return (
        <div className={styles.newDeck} onClick={() => { navigate("/create") }}>
            <Plus color="black" size={24}></Plus>
        </div>
    );
}

export default NewDeck;