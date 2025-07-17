const useStyles = () => {
    return {
        card: "border-2 border-neutral-200 h-38 p-4 rounded-lg flex text-lg flex-col justify-center items-center group relative overflow-hidden my-4 active:bg-amber-300 hover:shadow-lg transition-shadow duration-300 hover:border-2 hover:border-black",
        cardContainer: "relative w-full",
        cardHeader: "absolute right-4 top-4",
        delete: "cursor-pointer transition-colors md:invisible md:group-hover:visible hover:stroke-red-400 active:stroke-red-500",
        separator: "my-1 h-0.5 border-t-0 bg-black w-full",
    };
};

export default useStyles;