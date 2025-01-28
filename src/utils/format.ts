/**
 * 2025/1/22 14:47
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 格式化工具
 * @version 1.0
 * @since 1.0
 */

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// 扩展插件
dayjs.extend(utc)

/**
 * 日期格式化函数
 * 将UTC时间格式转换为 ==> YYYY-MM-DD
 * @param utcString
 * @param formatType
 */
export function dateFormat(
  utcString: string,
  formatType: string = 'YYYY-MM-DD'
) {
  return dayjs.utc(utcString).utcOffset(8).format(formatType)
}
