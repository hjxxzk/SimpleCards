const useStyles = () => {
    return {
        card: "relative w-1/2 h-2/3 bg-neutral-50 border-1 border-neutral-300 rounded-lg shadow-lg flex justify-center items-center text-4xl cursor-pointer",
        buttonsContainer: "absolute bottom-20 w-full h-1/12 flex justify-between px-30 text-2xl",
        yesButton: "w-1/4 bg-lime-300 hover:bg-lime-400 active:bg-lime-500 shadow-md rounded-lg text-black font-semibold cursor-pointer",
        noButton: "w-1/4 bg-red-300 hover:bg-red-400 active:bg-red-500 shadow-md rounded-lg text-black font-semibold cursor-pointer",
    };
};

export default useStyles;