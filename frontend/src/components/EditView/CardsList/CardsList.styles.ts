const useStyles = () => {
    return {
        sidebar: "px-5 py-1 sm:p-5 overflow-hidden h-1/4 lg:w-1/4 xl:w-1/5 lg:h-full flex flex-col border-b-3 lg:border-b-0 lg:border-r-3 border-neutral-400",
        separator: "h-0.5 border-t-0 bg-black mt-2 mb-1 lg:mb-7",
        cardsListGrid: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2 overflow-auto scrollbar-yellow items-center",
        cardsListFlex: "lg:flex-1 overflow-auto scrollbar-hidden items-center",
        text: "text-gray-600 text-md font-semibold text-center m-5",
    };
};

export default useStyles;