const useStyles = () => {
    return {
        container: "w-full lg:w-4/5 rounded-3xl flex items-center justify-center h-full",
        card: "relative flex flex-col items-center justify-around border-1 rounded-xl border-gray-600 sm:px-10 md:px-25 lg:px-15 py-10 sm:py-25 md:py-30 w-3/5 h-2/3 lg:h-1/2 3xl:h-4/5 shadow-2xl",
        separator: "my-1 h-0.5 border-t-0 bg-black w-full",
        saveButton: "bg-amber-300 hover:bg-amber-400 active:bg-amber-500 px-15 py-3 3xl:py-5 rounded-xl text-black font-semibold cursor-pointer shadow-md absolute sm:bottom-5 bottom-[-7rem] mb-8",
        title: "font-semibold text-lg sm:text-xl",
        formInputContainer: "flex flex-col items-center justify-center w-full gap-5"
    };
}

export default useStyles;
