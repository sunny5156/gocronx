const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  permissions: state => state.user.permissions,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  userInfo: state => state.user.info,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  errorLogs: state => state.errorLog.logs,
  theme: state => state.settings.theme,
  title: state => state.settings.title,
  fixedHeader: state => state.settings.fixedHeader,
  platforms: state => state.platform.allPlatforms
}
export default getters
