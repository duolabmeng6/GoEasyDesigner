
class HistoryManager {
    constructor() {
        this.historicalRecord = [];
        this.currentPosition = -1;
    }
    // 记录最新数据到最新的一条(内容){
    //     console.log("记录最新数据到最新的一条=========")
    //     console.log("历史currentPosition",this.currentPosition)
    //     console.log("查看当前历史所有记录",this.查看当前历史所有记录())
    //     this.historicalRecord[this.currentPosition]=内容
    // }
    记录(内容) {
        this.historicalRecord = this.historicalRecord.slice(0, this.currentPosition + 1);
        this.historicalRecord.push(内容);
        this.currentPosition = this.historicalRecord.length - 1;
        // console.log("记录=========")
        // console.log("历史currentPosition",this.currentPosition)
        // console.log("查看当前历史所有记录",this.查看当前历史所有记录())
    }

    撤销(内容) {
        if (内容){
            this.historicalRecord[this.currentPosition]=内容
        }
        // console.log("撤销=========")Ï
        // console.log("历史currentPosition",this.currentPosition)
        // console.log("查看当前历史所有记录",this.查看当前历史所有记录())
        if (this.currentPosition > 0) {
            // 移动到前一个historicalRecord
            this.currentPosition--;
            return this.historicalRecord[this.currentPosition];
        } else {
            // 已经没有historicalRecord可以撤销了
            return null;
        }
    }

    恢复(内容) {
        // console.log("恢复=========")
        // console.log("历史currentPosition",this.currentPosition)
        // console.log("查看当前历史所有记录",this.查看当前历史所有记录())
        if (this.currentPosition < this.historicalRecord.length - 1) {
            if (内容){
                this.historicalRecord[this.currentPosition]=内容
            }
            // 移动到后一个historicalRecord
            this.currentPosition++;
            return this.historicalRecord[this.currentPosition];
        } else {
            // 已经到达最新historicalRecord
            return null;
        }
    }


    查看当前历史所有记录() {
        return this.historicalRecord;
    }
}
const HistoryManagerLiving = new HistoryManager();

export {HistoryManagerLiving}
// 示例使用

// // 记录
// HistoryManager.记录("第一步操作");
// HistoryManager.记录("第二步操作");
//
// console.log("当前历史所有记录:", HistoryManager.查看当前历史所有记录());
//
// // 撤销
// const 撤销结果 = HistoryManager.撤销();
// console.log("撤销结果:", 撤销结果); // 输出：撤销结果: 第一步操作
//
// console.log("当前历史所有记录:", HistoryManager.查看当前历史所有记录());
//
// // // 恢复
// // const 恢复结果 = HistoryManager.恢复();
// // console.log("恢复结果:", 恢复结果); // 输出：恢复结果: 第二步操作
// //
// // console.log("当前历史所有记录:", HistoryManager.查看当前历史所有记录());
//
// // 记录新操作
// HistoryManager.记录("第三步操作");
//
// console.log("当前历史所有记录:", HistoryManager.查看当前历史所有记录());
//
// // 清除后续历史
// HistoryManager.已修改清除后续历史();
// console.log("当前历史所有记录:", HistoryManager.查看当前历史所有记录());
//
//
//
// // 恢复
// const 恢复结果 = HistoryManager.恢复();
// console.log("恢复结果:", 恢复结果); // 输出：恢复结果: 第二步操作
//
// console.log("当前历史所有记录:", HistoryManager.查看当前历史所有记录());
