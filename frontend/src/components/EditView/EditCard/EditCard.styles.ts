const useStyles = () => {
    return {
        container: "w-8/11 rounded-3xl flex items-center justify-center h-full",
        card: "relative flex flex-col items-center justify-around border-1 rounded-4xl font-xl border-gray-600 px-10 py-35 w-1/2 h-1/2 shadow-2xl",
        separator: "my-1 h-0.5 border-t-0 bg-black w-full",
        saveButton: "bg-amber-300 hover:bg-amber-400 active:bg-amber-500 px-15 py-5 rounded-xl text-black font-semibold cursor-pointer shadow-md absolute bottom-0 mb-8"
    };
}

export default useStyles;
