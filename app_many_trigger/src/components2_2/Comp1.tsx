import { useState } from "react";

import type { CompRawType } from "./CompRaw";
import { CompRaw } from "./CompRaw";


const CHILD_GAP: number = 5;
interface Comp1Props {
    data: CompRawType[];
}
export function Comp1({ data }: Comp1Props){
    // 子要素たちの高さを記録
    const [rawHeights, setRawHeights] = useState<number[]>(
        new Array(data.length).fill(0)
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
            <div>
                {data.map((craw, i) => (
                    <CompRaw
                        data={craw}
                        onChange={(h)=>handleOnChange(h, i)}
                    />
                ))}
            </div>
        </div>
    )
}

