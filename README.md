# react_many_draw_trigger
複数の子コンポーネントからの再描画要求によって再描画されない問題の、再現と対応

# 課題
- [Reactのステータスのロック？（課題のメモ） #非同期処理 - Qiita](https://qiita.com/yo16/items/e96814ce2154abad937c)

# 解決（MyParentFix.tsx）
- 親のheightを、子の`childrenVals`を受けたstateにせず、`childrenVals`から計算したローカル変数とする。
- `firstName`と`lastNamee`をstateに持っているとき、`fullName`をstateにするなという話
    - [Choosing the State Structure, Avoid redundant state – React](https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state)
- `const [childrenVals, setChildrenVals] = useState<number[]>(()=>new Array(childrenNumber).fill(0));`というコードから、本当に初期から配列が更新されないので、App.tsxからMyParentFixを呼ぶとき、keyを設定して、`childrenNumber`の更新が必要なときはkeyを変更している。その結果、`childrenNumber`が更新されるときは、親コンポーネントが作り直されている。
    - この部分は、もう少しいい解決方法があるかもしれない。
