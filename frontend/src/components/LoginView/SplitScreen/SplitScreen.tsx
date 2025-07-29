import React from "react";
import useStyles from "./SplitScreen.styles";

interface SplitScreenProps extends React.PropsWithChildren {
    leftWidth?: number,
    rightWidth?: number,
}


export const SplitScreen = ({ leftWidth = 1, rightWidth = 1, children }: SplitScreenProps) => {

    const [left, right] = React.Children.toArray(children);
    const styles = useStyles();

    return (
        <div className={styles.mainContainer}>
            <div className={`${styles.left} lg:flex-${leftWidth}`}>{left}</div>
            <div className={`${styles.right} lg:flex-${rightWidth}`}>{right}</div>
        </div >
    );
}