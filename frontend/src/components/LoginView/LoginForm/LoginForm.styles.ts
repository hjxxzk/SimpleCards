const useStyles = () => {
    return {
        formContainer: "bg-gray-50 h-full flex flex-col justify-center items-center gap-5 text-lg bold",
        title: "text-2xl font-semibold mb-5",
        inputContainer: "flex flex-col gap-3 text-xl min-w-70",
        input: "bg-gray-200 rounded-lg min-h-9 text-lg",
        checkBoxContainer: "flex gap-5",
        pointer: "cursor-pointer",
        registrationForwarding: "cursor-pointer hover:text-gray-500 active:text-gray-700",
        logInButton: "min-w-70 py-2 mt-5 bg-amber-300 hover:bg-amber-400 active:bg-amber-500 rounded-xl text-black font-semibold cursor-pointer shadow-md"
    }
};

export default useStyles;