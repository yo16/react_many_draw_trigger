import { useState, useEffect } from "react";

import type { Comp3Type } from "./Comp3";
import { Comp3 } from "./Comp3";

export type Comp2Type = {
    Comp2: Comp3Type[];
};

const C2_GAP: number = 4;
interface Comp2Props {
    data: Comp2Type;
    onChange: (h: number)=>void;
}
export function Comp2({ data, onChange }: Comp2Props){
    // 自分の高さ
    const [curHeight, setCurHeight] = useState<number>(0);
    // 子要素たちの高さを記憶
    const [childHeights, setChildHeights] = useState<number[]>(new Array(data.Comp2.length).fill(0));

    // 子要素から、サイズが変わったときのハンドル
    function handleOnChange(newHeight: number, i: number) {
        // stateを変更
        setChildHeights((c5h)=>c5h.map((h: number, j) => (i===j? newHeight: h)));
    }

    // 自分の高さの計算
    function getCurHeight(): number {
        return childHeights.reduce(
            (acc, h, i) => acc + (i>0? C2_GAP: 0) + h,
            0
        );
    }

    // 子の高さが変わったとき、自分の高さを再計算し、親へ通知
    useEffect(()=>{
        // 自分の高さを再計算
        const newCurHeight = getCurHeight();

        // statusを更新
        setCurHeight(newCurHeight);

        // 親へ通知
        onChange(newCurHeight);
    }, [childHeights]);

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <div
                style={{
                    height: curHeight,
                    backgroundColor: "#5e4ae3"
                }}
            >
                c2Height: {curHeight}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: C2_GAP,
                }}
            >
                {data.Comp2.map((c3, i)=>(
                    <Comp3
                        data={c3}
                        onChange={(h)=>handleOnChange(h, i)}
                    ></Comp3>
                ))}
            </div>
        </div>
    );
}
