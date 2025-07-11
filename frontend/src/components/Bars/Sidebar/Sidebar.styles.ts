const useStyles = () => {
    return {
        sidebar: "bg-gray-100 py-5 px-15 md:px-40 lg:px-5 lg:pr-10 w-full overflow-hidden absolute w-screen lg:static lg:w-100 xl:w-90 2xl:w-110 h-screen flex flex-col",
        separator: "h-0.5 border-t-0 bg-black mt-2 mb-7",
        decksList: "flex-1 overflow-auto scrollbar-hidden items-center lg:mb-15 min-w-64",
        text: "text-gray-600 text-md font-semibold text-center m-5",
    };
};

export default useStyles;