import { useState, useEffect } from "react";

import type { Comp5Type } from "./Comp5";
import { Comp5 } from "./Comp5";

export type Comp4Type = {
    Comp4: Comp5Type[];
};

const C4_GAP: number = 2;
interface Comp4Props {
    data: Comp4Type;
    onChange: (h: number)=>void;
}
export function Comp4({ data, onChange }: Comp4Props){
    // 子要素たちの高さを記憶
    const [c5Heights, setC5Heights] = useState<number[]>(new Array(data.Comp4.length).fill(0));

    // 子要素から、サイズが変わったときのハンドル
    function handleOnChange(newHeight: number, i: number) {
        // stateを変更
        setC5Heights((c5h)=>c5h.map((h: number, j) => (i===j? newHeight: h)));
    }

    // 自分の高さ
    // stateにせず、描画のたびに計算する
    const curHeight: number = c5Heights.reduce(
        (acc, h, i) => acc + (i>0? C4_GAP: 0) + h,
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
                    backgroundColor: "#f0a7a0"
                }}
            >
                c4Height: {curHeight}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: C4_GAP,
                }}
            >
                {data.Comp4.map((c5, i)=>(
                    <Comp5
                        data={c5}
                        onChange={(h)=>handleOnChange(h, i)}
                    ></Comp5>
                ))}
            </div>
        </div>
    );
}
