const useStyles = () => {
    return {
        container: "w-4/5 rounded-3xl flex items-center justify-center h-full",
        card: "relative flex flex-col items-center justify-around border-1 rounded-xl border-gray-600 px-25 py-20 w-3/5 h-4/5 shadow-2xl",
        separator: "my-1 h-0.5 border-t-0 bg-black w-full",
        saveButton: "bg-amber-300 hover:bg-amber-400 active:bg-amber-500 px-15 py-5 rounded-xl text-black font-semibold cursor-pointer shadow-md absolute bottom-0 mb-8",
        title: "font-semibold text-xl",
        formInputContainer: "flex flex-col items-center justify-center w-full gap-5"
    };
}

export default useStyles;
