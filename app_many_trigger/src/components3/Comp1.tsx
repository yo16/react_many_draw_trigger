import { useState } from "react";

import type { Comp2Type } from "./Comp2";
import { Comp2 } from "./Comp2";

export type Comp1Type = {
    Comp1: Comp2Type[];
}

const CHILD_GAP: number = 5;
interface Comp1Props {
    data: Comp1Type;
}
export function Comp1({ data }: Comp1Props){
    // 子要素たちの高さを記録
    const [rawHeights, setRawHeights] = useState<number[]>(
        new Array(data.Comp1.length).fill(0)
    )

    // 子要素から、サイズが変わった通知のハンドル
    function handleOnChange(newHeight: number, i: number) {
        // stateを変更
        setRawHeights((rh)=>rh.map((h:number, j) => (i===j? newHeight: h)));
    }

    // 自分の高さ
    // stateにせず、子要素たち(state)から算出する
    const curHeight: number = rawHeights.reduce(
        (acc, h, i) => acc + (i>0 ? CHILD_GAP: 0) + h,
        0
    );

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            {/* 子に合わせて高さを変える親 */}
            <div
                style={{
                    height: curHeight,
                    backgroundColor: "#f00",
                }}
            >
                parentHeight: {curHeight}
            </div>

            {/* 子たち */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: CHILD_GAP,
                }}
            >
                {data.Comp1.map((c_data, i) => (
                    <Comp2
                        key={`c2_${i}`}
                        data={c_data}
                        onChange={(h)=>handleOnChange(h, i)}
                    />
                ))}
            </div>
        </div>
    )
}

