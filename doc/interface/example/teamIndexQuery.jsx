export default {
  resultCode: '000000',
  resultMesg: '成功',
  data: {
    // 工作指标
    CURRENT_CALL_CNT: 18, // 当前通话人力
    CURRENT_IDLE_CNT: 10, // 当前空闲人力
    // 业绩指标
    TODAY_TOTAL_CI_PREMIUM: 300000, // 当日累计车险保费
    TODAY_TOTAL_CI_CUST_CNT: 20, // 当日累计车险标的数
    TODAY_TOTAL_CI_AVG_PREMIUM: 20, // 当日累计车险件均
    TODAY_TOTAL_NCI_PREMIUM: 30000, // 当日累计非车保费
    // 话务指标
    REALTIME_EFFEC_TALKTIME: 0.57, // 人均实时有效通时(上一时段)
    TODAY_TOTAL_TALKTIME: 0.47, // 人均当日累计通时
    REALTIME_EFFEC_TALKNUM: 10, // 人均实时有效通次(上一时段)
    TODAY_TOTAL_TALKNUM: 8, // 人均当日累计通次
    REALTIME_AVG_TALKTIME: 0.39, // 人均实时平均通时(上一时段)
    TODAY_TOTAL_AVG_TALKTIME: 0.59, // 人均当日累计平均通时
    // 上日话务情况
    PER_LAST_SUM_AVG: 1.23, // 人均上日累计平均通时
    PER_LAST_SUM_TIME: 1.23, // 人均上日累计通时
    PER_LAST_SUM_COUNT: 30, // 人均上日累计通次
  }
}
