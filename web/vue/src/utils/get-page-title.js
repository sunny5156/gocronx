import defaultSettings from '@/settings'

const title = defaultSettings.title || 'gocronx 定时任务系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
