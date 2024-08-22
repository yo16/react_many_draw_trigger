import { useState } from "react";
import { MyParent } from "./components/MyParent"
import { MyParentFix } from "./components/MyParentFix"

export function App1() {
    const [clickedCount, setClickedCount] = useState<number>(0);
    const [childrenNumber, setChildrenNumber] = useState<number>(30);

    return (
        <>
            <MyParentFix
                key={`parent_${clickedCount}`}
                childrenNumber={childrenNumber}
                doRedraw={clickedCount%2===0}
            /><br />
            <button
                onClick={()=>{
                    setChildrenNumber((c)=>c+1);
                    //setClickedCount(0);
                    setClickedCount((n)=>n+(n%2===0?2:1));  // 次の偶数
                }}
            >＋</button>
            <button
                onClick={()=>{
                    setChildrenNumber((c)=>c-1);
                    setClickedCount((n)=>n+(n%2===0?2:1));  // 次の偶数
                }}
            >－</button>
            <br /><br />
            <button
                onClick={()=>{setClickedCount((c)=>c+1);}}
                style={{height:50, width:100}}
            >{(clickedCount%2===0)?"reset":"redraw!"}</button>
        </>
    )
}
