const useStyles = () => {
    return {
        sidebar: "bg-gray-100 py-5 pb-20 px-15 md:px-40 lg:px-5 xl:px-10 lg:w-1/5 overflow-hidden absolute w-screen lg:static h-screen flex flex-col z-1000",
        separator: "h-0.5 border-t-0 bg-black mt-2 mb-7",
        decksList: "flex-1 overflow-auto scrollbar-hidden items-center lg:mb-15",
        text: "text-gray-600 text-md font-semibold text-center m-5",
    };
};

export default useStyles;