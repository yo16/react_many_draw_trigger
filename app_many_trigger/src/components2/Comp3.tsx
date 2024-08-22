import { useState, useEffect } from "react";

import type { Comp4Type } from "./Comp4";
import { Comp4 } from "./Comp4";

export type Comp3Type = {
    Comp3: Comp4Type[];
};

const C3_GAP: number = 3;
interface Comp3Props {
    data: Comp3Type;
    onChange: (h: number)=>void;
}
export function Comp3({ data, onChange }: Comp3Props){
    // 子要素たちの高さを記憶
    const [c5Heights, setC5Heights] = useState<number[]>(new Array(data.Comp3.length).fill(0));

    // 子要素から、サイズが変わったときのハンドル
    function handleOnChange(newHeight: number, i: number) {
        // stateを変更
        setC5Heights((c5h)=>c5h.map((h: number, j) => (i===j? newHeight: h)));
    }

    // 自分の高さ
    // stateにせず、描画のたびに計算する
    const curHeight: number = c5Heights.reduce(
        (acc, h, i) => acc + (i>0? C3_GAP: 0) + h,
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
                    backgroundColor: "#947bd3"
                }}
            >
                c3Height: {curHeight}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: C3_GAP,
                }}
            >
                {data.Comp3.map((c4, i)=>(
                    <Comp4
                        data={c4}
                        onChange={(h)=>handleOnChange(h, i)}
                    ></Comp4>
                ))}
            </div>
        </div>
    );
}
