import { useState, useEffect } from "react";

import type { CompRawType } from "./CompRaw";
import { CompRaw } from "./CompRaw";

export type Comp5Type = {
    Comp5: CompRawType[];
};

const C5_GAP: number = 1;
interface Comp5Props {
    data: Comp5Type;
    onChange: (h: number)=>void;
}
export function Comp5({ data, onChange }: Comp5Props){
    // 子要素たちの高さを記憶
    const [rawHeights, setRawHeights] = useState<number[]>(new Array(data.Comp5.length).fill(0));

    // 子要素から、サイズが変わったときのハンドル
    function handleOnChange(newHeight: number, i: number) {
        // stateを変更
        setRawHeights((rh)=>rh.map((h: number, j) => (i===j? newHeight: h)));
    }

    // 自分の高さ
    // stateにせず、描画のたびに計算する
    const curHeight: number = rawHeights.reduce(
        (acc, h, i) => acc + (i>0? C5_GAP: 0) + h,
        0
    );

    // 自分の高さが変わったときは、useEffectで親へ通知
    useEffect(()=>{
        onChange(curHeight);
    }, [curHeight]);

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <div
                style={{
                    height: curHeight,
                    backgroundColor: "#f26ca7"
                }}
            >
                c5Height: {curHeight}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: C5_GAP,
                }}
            >
                {data.Comp5.map((craw, i)=>(
                    <CompRaw
                        data={craw}
                        onChange={(h)=>handleOnChange(h, i)}
                    ></CompRaw>
                ))}
            </div>
        </div>
    );
}
