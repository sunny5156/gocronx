/*
* 广告首页统计图表数据格式
* 接口数据请按以下格式提供
* title: '我是图表的标题，不需要时传空'
* toolbox: true/false，折线图右上角的切换等工具栏，显示：true，不显示：false
* 1.新建广告数总数--totalNumberNewAdvt
* 新建广告数图表数据--numberNewAdvtChartData
* 2.发布成功广告数总数--totalNumberSuccessReleaseAdvt
* 发布成功广告数图表数据 --numberSuccessReleaseAdvtChartData
* 3.库存更新数总数--totalNumberInventoryUpdate
* 库存更新数图表数据--numberInventoryUpdateChartData
* 4.价格更新数总数--totalNumberPriceUpdate
* 价格更新数图表数据--numberPriceUpdateChartData
* 5.创建成功总数--totalNumberCreateSuccess
* 6.发布成功总数--totalNumberPublishSuccess
* 7.今日创建成功总数--totalNumberCreateSuccessToday
* 8.今日发布成功总数--totalNumberPublishSuccessToday
* */
export const chartData = {
  panelData: {
    totalNumberCreateSuccess: 120,
    totalNumberPublishSuccess: 230,
    totalNumberCreateSuccessToday: 340,
    totalNumberPublishSuccessToday: 450
  },
  totalNumberNewAdvt: 123654,
  numberNewAdvtChartData: {
    title: '新建广告数',
    toolbox: true,
    series: [
      [4765, 4765, 4765, 4765, 4765, 4765, 4765],
      [5316, 5316, 5316, 5316, 5316, 5316, 5316],
      [1012, 2012, 3012, 4023, 3023, 1230, 2120]
    ],
    xAxisData: ['2018-10-05', '2018-10-06', '2018-10-07', '2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11'],
    legendData: ['Normal', 'Variation', 'Combo']
  },
  totalNumberSuccessReleaseAdvt: 1254154,
  numberSuccessReleaseAdvtChartData: {
    title: '发布成功广告数',
    toolbox: true,
    series: [
      [4765, 4765, 4765, 4765, 4765, 4765, 4765],
      [5316, 5316, 5316, 5316, 5316, 5316, 5316],
      [1012, 2012, 3012, 4023, 3023, 1230, 2120]
    ],
    xAxisData: ['2018-10-05', '2018-10-06', '2018-10-07', '2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11'],
    legendData: ['Normal', 'Variation', 'Combo']
  },
  totalNumberInventoryUpdate: 153165,
  numberInventoryUpdateChartData: {
    title: '库存更新数',
    toolbox: true,
    series: [
      [4765, 4765, 4765, 4765, 4765, 4765, 4765],
      [1012, 2012, 3012, 4023, 3023, 1230, 2120],
      [5316, 5316, 5316, 5316, 5316, 5316, 5316]
    ],
    xAxisData: ['2018-10-05', '2018-10-06', '2018-10-07', '2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11'],
    legendData: ['Normal', 'Variation', 'Combo']
  },
  totalNumberPriceUpdate: 456855,
  numberPriceUpdateChartData: {
    title: '价格更新数',
    toolbox: true,
    series: [
      [5316, 5316, 5316, 5316, 5316, 5316, 5316],
      [4765, 4765, 4765, 4765, 4765, 4765, 4765],
      [1012, 2012, 3012, 4023, 3023, 1230, 2120]
    ],
    xAxisData: ['2018-10-05', '2018-10-06', '2018-10-07', '2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11'],
    legendData: ['Normal', 'Variation', 'Combo']
  }
}
