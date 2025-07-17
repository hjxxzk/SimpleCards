import useStyles from './NewElement.styles';
import { Plus } from 'lucide-react';
import type { NewDeckProps as NewElementProps } from './NewElementProps.types';

const NewElement = (props: NewElementProps) => {

    const styles = useStyles();

    return (
        <div className={styles.newElement} onClick={props.navigate}>
            <Plus color="black" size={24}></Plus>
        </div>
    );
}

export default NewElement;