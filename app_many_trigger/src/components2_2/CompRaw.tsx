import { useEffect } from "react";

export type CompRawType = {
    str: string;
};

interface CompRawProps {
    data: CompRawType;
    onChange: (h: number)=>void;
}
export function CompRaw({ data, onChange }: CompRawProps){
    // 最初に高さをランダムで決める（50～99）
    const currentHeight: number = Math.floor(Math.random()*50)+50;

    useEffect(()=>{
        onChange(currentHeight);
    }, [currentHeight])

    return (
        <div
            style={{
                height: currentHeight,
                backgroundColor: "#f93",
            }}
        >
            {data.str}
        </div>
    );
}
