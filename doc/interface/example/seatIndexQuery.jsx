export default {
    resultCode: '000000',
    resultMesg: '成功',
    data: {
        // 基本信息
        TMR_NAME: '大大', // 姓名
        ONBOARD_AGE: 3, // 司龄
        TMR_TYPE: 'ib', // 坐席业务模式
        POSITION_NAME: 'A类坐席', // 坐席职级描述
        // 当日工作情况
        IS_ACTIVE: 1, // 坐席活跃状态，0非活跃，1活跃
        // 当日业绩情况
        TODAY_TOTAL_CI_PREMIUM: 234, // 当天累计车险保费
        SECURITY_THROUGH_CUST_CNT: 124, // 当日累计核保通过客户数
        TODAY_TOTAL_NCI_PREMIUM: 234, // 当日累计非车保费
        // 当日话务状态
        REALTIME_EFFEC_TALKTIME: 22.23, // 实时有效通时
        TODAY_TOTAL_TALKTIME: 23.34, // 当日累计通时
        REALTIME_EFFEC_TALKNUM: 23, // 实时累计通次
        TODAY_TOTAL_TALKNUM: 23, // 当日累计通次
        REALTIME_AVG_TALKTIME: 22.23, // 实时平均通时
        TODAY_TOTAL_AVG_TALKTIME: 23.34, // 当日平均通时
        // 上日话务情况
        LAST_SUM_AVG: 34.22, // 上日累计平均通时
        LAST_SUM_TIME: 333.12, // 上日累计通时
        LAST_SUM_COUNT: 23, // 上日累计通次
    }
}
