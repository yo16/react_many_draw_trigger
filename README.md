# react_many_draw_trigger
複数の子コンポーネントからの再描画要求によって再描画されない問題の、再現と対応

# 課題：App1
- [Reactのステータスのロック？（課題のメモ） #非同期処理 - Qiita](https://qiita.com/yo16/items/e96814ce2154abad937c)

# 解決（App1＞MyParentFix.tsx）
- 親のheightを、子の`childrenVals`を受けたstateにせず、`childrenVals`から計算したローカル変数とする。
- `firstName`と`lastNamee`をstateに持っているとき、`fullName`をstateにするなという話
    - [Choosing the State Structure, Avoid redundant state – React](https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state)
- `const [childrenVals, setChildrenVals] = useState<number[]>(()=>new Array(childrenNumber).fill(0));`というコードから、本当に初期から配列が更新されないので、App.tsxからMyParentFixを呼ぶとき、keyを設定して、`childrenNumber`の更新が必要なときはkeyを変更している。その結果、`childrenNumber`が更新されるときは、親コンポーネントが作り直されている。
    - この部分は、もう少しいい解決方法があるかもしれない。

# 課題２：App2
[yo16/sql_parse_client_202407: using Vite](https://github.com/yo16/sql_parse_client_202407)で、下記のwarningが出る現象の再現と対応
```
TableStructQuerySelectBox.tsx:66 Warning: Cannot update a component (`TableStructQuerySelectBox`) while rendering a different component (`ClauseColumnsBox`). To locate the bad setState() call inside `ClauseColumnsBox`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    at ClauseColumnsBox (http://localhost:5173/src/UIComponents/CanvasComponents/ClauseColumnsBox.tsx:28:3)
```
- 再現できず・・・
    - 別の何かの問題が出て、描画が止まらなくなった。
    - 今回5階層で作ってしまったけど、2階層でも起きそう。
        - → App2-2
```
Comp5.tsx:22 Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
```
- 参考
    - [React v16.13.0 – React Blog](https://ja.legacy.reactjs.org/blog/2020/02/26/react-v16.13.0.html#warnings-for-some-updates-during-render)
    > React コンポーネントは、レンダー中に他のコンポーネントに副作用を起こしてはいけません。
    - [Bug: too hard to fix "Cannot update a component from inside the function body of a different component." · Issue #18178 · facebook/react](https://github.com/facebook/react/issues/18178#issuecomment-595846312)

## 浅い階層でも今回の問題を再現させる：App2-2

