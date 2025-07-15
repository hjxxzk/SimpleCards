export default interface EditTextProps {
    word: string;
    placeholder: string;
    isChanged?: boolean;
    changeWord: (word: string) => void;
    cancelEdit: () => void;
}