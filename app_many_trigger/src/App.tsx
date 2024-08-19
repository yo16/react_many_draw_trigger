import { useState } from "react";
import { MyParent } from "./components/MyParent"

export function App() {
    const [clickedCount, setClickedCount] = useState<number>(0);
    const [childrenNumber, setChildrenNumber] = useState<number>(30);

    return (
        <>
            <MyParent
                childrenNumber={childrenNumber}
                doRedraw={clickedCount%2===0}
            /><br />
            <button
                onClick={()=>{setChildrenNumber((c)=>c+1);setClickedCount(0);}}
            >＋</button>
            <button
                onClick={()=>{setChildrenNumber((c)=>c-1);setClickedCount(0);}}
            >－</button>
            <br /><br />
            <button
                onClick={()=>{setClickedCount((c)=>c+1);console.clear();}}
                style={{height:50, width:100}}
            >{(clickedCount%2===0)?"reset":"redraw!"}</button>
        </>
    )
}
