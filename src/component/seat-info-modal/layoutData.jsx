
import React from 'react';
import { Icon, Tooltip } from 'components';
import styles from './index.less'

export default [{
    header: '基本信息',
    content: [{
        title: '姓名',
        text: 'TMR_NAME'
    }, {
        title: '司龄',
        text: 'ONBOARD_AGE',
        suffix: '月'
    }, {
        title: '坐席业务模式',
        text: 'TMR_TYPE'
    }, {
        title: '职级描述',
        text: 'POSITION_NAME',
        className: styles.info_80
    }]
}, {
    header: '当日工作情况',
    content: [{
        title: '是否话务活跃',
        text: 'IS_ACTIVE',
        mapData: {
            '0': '否',
            '1': '是'
        }
    }]
}, {
    header: '当日业绩情况',
    content: [{
        title: '当日累计车险保费',
        text: 'TODAY_TOTAL_CI_PREMIUM',
        className: styles.info_180
    }, {
        title: '当日累计核保通过客户数',
        text: 'SECURITY_THROUGH_CUST_CNT',
        className: styles.info_180,
    }, {
        title: '当日累计非车保护费',
        text: 'TODAY_TOTAL_NCI_PREMIUM',
        className: styles.info_180,
    }]
}, {
    header: '当日话务情况',
    content: {
        children: [[{
            title: '实时有效通时(上一时段)',
            text: 'REALTIME_EFFEC_TALKTIME',
            className: styles.info_180,
            suffix: 'h'
        }, {
            title: '实时有效通次(上一时段)',
            text: 'REALTIME_EFFEC_TALKNUM',
            className: styles.info_180,
        }, {
            title: '实时平均通时(上一时段)',
            text: 'REALTIME_AVG_TALKTIME',
            className: styles.info_180,
            suffix: 'h'
        }], [{
            title: '当日累计通时',
            text: 'TODAY_TOTAL_TALKTIME',
            suffix: 'h',
            children: (data) => {
                let title = data && data.LAST_SUM_TIME ? `昨日累计通时 ${data.LAST_SUM_TIME} h` : '';
                let type = data && data.TODAY_TOTAL_TALKTIME >= data.LAST_SUM_TIME ? 'arrowup' : 'arrowdown'
                return (
                  <Tooltip placement='right' title={title}>
                    {data && <Icon type={type} className={styles.fixIcon} />}
                  </Tooltip>
                )
            }
        }, {
            title: '当日累计通次',
            text: 'TODAY_TOTAL_TALKNUM',
            children: (data) => {
                let title = data && data.LAST_SUM_COUNT ? `昨日累计通次 ${data.LAST_SUM_COUNT}` : '';
                let type = data && data.TODAY_TOTAL_TALKNUM >= data.LAST_SUM_COUNT ? 'arrowup' : 'arrowdown'
                return (
                  <Tooltip placement='right' title={title}>
                    {data && <Icon type={type} className={styles.fixIcon} />}
                  </Tooltip>
                )
            }
        }, {
            title: '当日累计平均通时',
            text: 'LAST_SUM_AVG',
            suffix: 'h',
            children: (data) => {
                let title = data && data.LAST_SUM_AVG ? `昨日累计平均通时 ${data.LAST_SUM_AVG} h` : '';
                let type = data && data.TODAY_TOTAL_AVG_TALKTIME >= data.LAST_SUM_AVG ? 'arrowup' : 'arrowdown'
                return (
                  <Tooltip placement='right' title={title}>
                    {data && <Icon type={type} className={styles.fixIcon} style={{ right: '17px' }} />}
                  </Tooltip>
                )
            }
        }]]
    }
}]
