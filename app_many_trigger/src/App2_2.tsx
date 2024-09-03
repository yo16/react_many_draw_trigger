import { Comp1 } from "./components2_2/Comp1";
import type { CompRawType } from "./components2_2/CompRaw";

export function App2_2() {
    const curData: CompRawType[] = [
        {str: "0-0-0-0",},
        {str: "0-0-0-1",},
        {str: "0-0-0-2",},
        {str: "0-0-0-3",},
    ];

    return (
        <Comp1
            data={curData}
        />
    )
}
