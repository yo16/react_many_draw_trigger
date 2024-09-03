import { Comp1 } from "./components3/Comp1";
import type { Comp1Type } from "./components3/Comp1";

export function App3() {
    const curData: Comp1Type = {
        Comp1: [
            {
                Comp2: [
                    {str: "0-0-0-0",},
                    {str: "0-0-0-1",},
                    {str: "0-0-0-2",},
                    {str: "0-0-0-3",},
                ],
            },
            {
                Comp2: [
                    {str: "0-0-1-0",},
                    {str: "0-0-1-1",},
                    {str: "0-0-1-2",},
                ],
            },
        ],
    };

    return (
        <Comp1
            data={curData}
        />
    )
}
