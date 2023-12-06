export const 窗口事件代码模板 =`import * as systemFc from "../../wailsjs/runtime";
import * as goFc from "../../wailsjs/go/main/App";
import {__load_data} from './__load_data'

export function BindWindowEvent() {
    const c = __load_data()
    let comps = c.comps
//Don't delete the event function flag
}`