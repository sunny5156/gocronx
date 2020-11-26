import VuePicturePreview from 'vue-simple-picture-preview'

const pictureView = {
  install: function(Vue) {
    Vue.component('PictureView', VuePicturePreview)
  }
}

export default pictureView
