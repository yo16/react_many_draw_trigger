import { useState, useEffect } from "react";

export const CHILD_WIDTH: number = 20;

interface MyChildProps {
    isSwitchOn: boolean;
    onChanged: (n: number) => void;
}
export function MyChild({
    isSwitchOn,
    onChanged
}: MyChildProps){
    const [curHeight, setCurHeight] = useState<number>(0);

    useEffect(()=>{
        if (isSwitchOn) {
            // 0～100のランダムな値を設定する
            const newHeight: number = Math.floor(Math.random()*100);

            //const waitTime = 0;
            const waitTime = newHeight*30;          // 数字が小さいほど早く返す
            //const waitTime = (100-newHeight)*50;    // 数字が大きいほど早く返す
            //const waitTime = Math.random()*1000;    // ランダム

            setTimeout(()=>{
                setCurHeight(newHeight);
                onChanged(newHeight);
            }, waitTime);
        } else {
            setCurHeight(0);
            onChanged(0);
        }
    }, [isSwitchOn]);

    return (
        <>
            <rect
                x="0"
                y="0"
                width={CHILD_WIDTH}
                height={curHeight}
                fill="#9e9"
                stroke="#363"
                strokeWidth="1"
            />
            <text
                x="3"
                y="20"
                fill="#000"
            >{curHeight}</text>
        </>
    )
}
