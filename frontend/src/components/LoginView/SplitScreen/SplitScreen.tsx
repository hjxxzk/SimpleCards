import React from "react";

interface SplitScreenProps extends React.PropsWithChildren {
    leftWidth?: number,
    rightWidth?: number,
}


export const SplitScreen = ({ leftWidth = 1, rightWidth = 1, children }: SplitScreenProps) => {

    const [left, right] = React.Children.toArray(children);

    return (
        <div className="flex flex-col lg:flex-row">
            <div className={`flex-${leftWidth}`}>{left}</div>
            <div className={`flex-${rightWidth}`}>{right}</div>
        </div >
    );
}