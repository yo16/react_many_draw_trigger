import { useState, useEffect } from "react";

import { MyChild, CHILD_WIDTH } from "./MyChild";

const CHILD_MERGIN: number = 5;
const CHILD_START: {x: number, y: number} = {x: 20, y: 20};

interface MyParentProps {
    childrenNumber: number;
    doRedraw: boolean;      // false:初期化, true:再描画
};
export function MyParent({
    childrenNumber,
    doRedraw
}: MyParentProps) {
    const [childrenVals, setChildrenVals] = useState<number[]>([]);
    const [parentWidth, setParentWidth] = useState<number>(0);
    const [parentHeight, setParentHeight] = useState<number>(0);

    // 初期化
    useEffect(()=>{
        setChildrenVals(
            new Array(childrenNumber).fill(0)
        );
        setParentWidth(CHILD_MERGIN + childrenNumber*(CHILD_WIDTH+CHILD_MERGIN));
        setParentHeight(0);
    }, [childrenNumber]);

    // 子要素のValが変わったとき、包含する親要素の高さを変更する
    useEffect(()=>{
        if (childrenVals.length) {
            // わざとちょっと待って、setParentHeight
            //console.log(childrenVals);
            const maxValue = Math.max(...childrenVals);
            let waitTime = 0;
            if (maxValue>0) {
                //waitTime = Math.random()*1000;   // ランダムで0～1秒 [再現する]
                //waitTime = (100-maxValue)*10;     // 小さいほど待つ 0～1秒 再現しない
                waitTime = (100-maxValue)*100;     // 小さいほど待つ 0～10秒 [再現する]
                //waitTime = maxValue*10;           // 大きいほど待つ 0～1秒 再現しない
            }
            setTimeout(()=>{
                console.log(`1.maxValue:${maxValue}`);
                console.log(`2.waitTime:${waitTime}`);
                const maxValue2 = Math.max(...childrenVals);
                if (maxValue < maxValue2) {
                    console.log("逆に入れ替わった！");
                }

                setParentHeight(maxValue);
            }, waitTime);

            
            //setParentHeight(Math.max(...childrenVals));
        }
    }, [childrenVals]);

    // 子要素の値が変わったことを、useStateへ通知する
    function handleOnChanged(childVal: number, i: number) {
        childrenVals[i] = childVal;
        setChildrenVals([...childrenVals]);
    }

    return (
        <>
            <svg
                width={1000}
                height={300}
                style={{ backgroundColor: "#eed" }}
            >
                <rect
                    id="rectParent"
                    x={CHILD_START.x}
                    y={CHILD_START.y}
                    width={parentWidth}
                    height={parentHeight + CHILD_MERGIN*2}
                    fill="#ccc"
                    stroke="#999"
                    strokeWidth="2"
                />
                <text
                    x={CHILD_START.x + parentWidth + 5}
                    y={CHILD_START.y + 20}
                    fill="#000"
                >{parentHeight}</text>
                {childrenVals.map((_, i)=>(
                    <g
                        transform={`translate(${
                            CHILD_START.x + i*(CHILD_MERGIN+CHILD_WIDTH) + CHILD_MERGIN
                        }, ${
                            CHILD_START.y + CHILD_MERGIN
                        })`}
                        key={`myChild_${i}`}
                    >
                        <MyChild
                            isSwitchOn={doRedraw}
                            onChanged={(val:number) => handleOnChanged(val, i)}
                        />
                    </g>
                ))}
            </svg>
        </>
    )
}
