// 問題解消版

import { useState } from "react";

import { MyChild, CHILD_WIDTH } from "./MyChild";

const CHILD_MARGIN: number = 5;
const CHILD_START: {x: number, y: number} = {x: 20, y: 20};

interface MyParentFixProps {
    childrenNumber: number;
    doRedraw: boolean;      // false:初期化, true:再描画
};
export function MyParentFix({
    childrenNumber,
    doRedraw
}: MyParentFixProps) {
    const [childrenVals, setChildrenVals] = useState<number[]>(()=>new Array(childrenNumber).fill(0));
    const parentWidth = CHILD_MARGIN + childrenNumber*(CHILD_WIDTH+CHILD_MARGIN);
    const parentHeight = Math.max(...childrenVals);     // childrenValsというstateから計算できるものは、stateにしない

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
                    height={parentHeight + CHILD_MARGIN*2}
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
                            CHILD_START.x + i*(CHILD_MARGIN+CHILD_WIDTH) + CHILD_MARGIN
                        }, ${
                            CHILD_START.y + CHILD_MARGIN
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
