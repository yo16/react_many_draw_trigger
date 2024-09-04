import { useState, useEffect, useMemo } from "react";

import type { CompRawType } from "./CompRaw"
import { CompRaw } from "./CompRaw";

export type Comp2Type = {
    Comp2: CompRawType[]
}

const CHILD_GAP: number = 2;
interface Comp2Props {
    data: Comp2Type;
    onChange: (h: number) => void;
}
export function Comp2({ data, onChange }: Comp2Props) {
    //const [ curHeight2, setCurHeight2 ] = useState<number>(0);
    //const [ curHeight, setCurHeight ] = useState<number>(0);
    const [ childHeights, setChildHeights ] = useState<number[]>(
        new Array(data.Comp2.length).fill(0)
    );

    function handleOnChange(newHeight: number, i: number){
        // 新しい子の高さを計算
        setChildHeights(
            (hs) => hs.map((h:number, j) => (i===j? newHeight: h))
        );
    }

    function calcCurHeight(): number {
        return childHeights.reduce(
            (acc, h, i) => acc + (i>0 ? CHILD_GAP: 0) + h,
            0
        );
    }

    //useEffect(
    //    ()=> onChange(curHeight2),
    //    [curHeight2]
    //);

    const curHeight = useMemo(
        ()=>calcCurHeight(),
        [childHeights]
    );

    useEffect(
        ()=>{
            // 自分の新しい高さ
            //const newCurHeight = calcCurHeight();
            const newCurHeight = curHeight;

            // stateを更新
            //setCurHeight(()=>calcCurHeight());
            //setCurHeight(newCurHeight);

            // 親を呼び出す
            onChange(newCurHeight);
        },
        [childHeights]
    )

    //const curHeight: number = calcCurHeight();
    //setCurHeight2(curHeight);
    //onChange(curHeight);

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            {/* 子に合わせて高さを変える親 */}
            <div
                style = {{
                    height: curHeight,
                    backgroundColor: "#f93",
                }}
            >
                Comp2.height: {curHeight}
            </div>

            {/* 子たち */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: CHILD_GAP,
                }}
            >
                {data.Comp2.map((c, i) => (
                    <CompRaw
                        key={`craw_${i}`}
                        data={c}
                        onChange={(h)=>handleOnChange(h, i)}
                    />
                ))}
            </div>

        </div>
    );
}
