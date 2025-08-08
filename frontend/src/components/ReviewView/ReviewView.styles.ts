const useStyles = () => {
    return {
        mainContainer: "w-full lg:w-4/5 3xl:w-5/6 bg-white flex items-center justify-center rounded-tl-3xl shadow-lg mb-5 my-3 mx-5 lg:my-5 lg:mr-10 rounded-3xl",
        noContentMessage: "flex flex-col gap-5 text-gray-600 text-lg font-semibold text-center m-5",
        addCardsButton: "bg-amber-300 hover:bg-amber-400 active:bg-amber-500 py-2 mx-5 rounded-lg text-black font-semibold cursor-pointer shadow-md",
        repeatButton: "relative group p-5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-4xl cursor-pointer",
        summaryContainer: "flex flex-col justify-center items-center lg:w-1/3 gap-10",
        summaryContent: "bg-gray-100 rounded-xl scrollbar-yellow w-full p-8",
        text: "text-xl text-gray-500 font-semibold pb-5",
        cardResult: "text-lg pl-5",
        congratulations: "font-semibold text-xl",
    };
}

export default useStyles;