import { useState } from "react";

import type { Comp2Type } from "./Comp2";
import { Comp2 } from "./Comp2";

export type Comp1Type = {
    Comp1: Comp2Type[];
};

const C1_GAP: number = 5;
interface Comp1Props {
    data: Comp1Type;
}
export function Comp1({ data }: Comp1Props){
    // 子要素たちの高さを記憶
    const [c5Heights, setC5Heights] = useState<number[]>(new Array(data.Comp1.length).fill(0));

    // 子要素から、サイズが変わったときのハンドル
    function handleOnChange(newHeight: number, i: number) {
        // stateを変更
        setC5Heights((c5h)=>c5h.map((h: number, j) => (i===j? newHeight: h)));
    }

    // 自分の高さ
    // stateにせず、描画のたびに計算する
    const curHeight: number = c5Heights.reduce(
        (acc, h, i) => acc + (i>0? C1_GAP: 0) + h,
        0
    );

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <div
                style={{
                    height: curHeight,
                    backgroundColor: "#05299e"
                }}
            >
                c1Height: {curHeight}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: C1_GAP,
                }}
            >
                {data.Comp1.map((c2, i)=>(
                    <Comp2
                        data={c2}
                        onChange={(h)=>handleOnChange(h, i)}
                    ></Comp2>
                ))}
            </div>
        </div>
    );
}
