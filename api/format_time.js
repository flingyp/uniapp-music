export default () => {
	let now_time = new Date()
	// 年
	let now_year = now_time.getFullYear()
	// 月  注： 月份要 + 1
	let now_month = now_time.getMonth() + 1 < 9? "0"+(now_time.getMonth() + 1).toString() : (now_time.getMonth() + 1).toString()
	// 日
	let now_day = now_time.getDate() < 9? "0" + (now_time.getDate()).toString() : (now_time.getDate()).toString()
	// 时
	let now_hour = now_time.getHours() < 9? "0" + (now_time.getHours()).toString() : (now_time.getHours()).toString()
	// 秒
	let now_minutes = now_time.getMinutes() < 9? "0" + (now_time.getMinutes()).toString() : (now_time.getMinutes()).toString()
	
	let nowTime = `${now_year}-${now_month}-${now_day} ${now_hour}: ${now_minutes}`
	return nowTime
}










