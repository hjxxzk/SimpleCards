import useStyles from "./EditText.styles";
import { X } from 'lucide-react';
import type EditTextProps from './EditText.types';

const EditText = (props: EditTextProps) => {

    const styles = useStyles();

    return (
        <div className={styles.mainContainer}>
            <input
                type="text"
                className={styles.inputField}
                placeholder={props.placeholder}
                onChange={(e) => props.changeWord(e.target.value)}
                value={props.word} />
            <X color="gray" size={24} onClick={() => { props.cancelEdit() }} className={props.isChanged ? styles.cancelButton : "hidden"} />

        </div>
    );
}

export default EditText;