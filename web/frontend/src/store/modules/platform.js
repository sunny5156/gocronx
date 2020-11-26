const platform = {
  namespaced: true,
  state: {
    allPlatforms: []
  },
  mutations: {
    ADD_PLATFORM: (state, platform) => {
      state.allPlatforms.push(platform)
    }
  },
  actions: {
    addPlatform({ commit }, platform) {
      commit('ADD_PLATFORM', platform)
    }
  }
}

export default platform
