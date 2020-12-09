<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea"/>
  </div>
</template>

<script>

  import plugins from './plugins'
  import toolbar from './toolbar'
  import './../../../public/static/tinymce4.7.5/tinymce.min.js'

  window.tinymce.baseURL = '/static/tinymce4.7.5'
  window.tinymce.suffix = '.min'
  export default {
    name: 'Tinymce',
    props: {
      id: {
        type: String,
        default: function() {
          return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
        }
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      menubar: {
        type: String,
        default: 'file edit insert view format table'
      },
      height: {
        type: [Number, String],
        required: false,
        default: 360
      },
      width: {
        type: [Number, String],
        required: false,
        default: 'auto'
      }
    },
    data() {
      return {
        hasChange: false,
        hasInit: false,
        tinymceId: this.id,
        fullscreen: false,
        languageTypeList: {
          'en': 'en',
          'zh': 'zh_CN'
        }
      }
    },
    computed: {
      // language() {
      //   return this.languageTypeList[this.$store.getters.language]
      // },
      containerWidth() {
        const width = this.width
        if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
          return `${width}px`
        }
        return width
      }
    },
    watch: {
      value(val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() =>
            window.tinymce.get(this.tinymceId).setContent(val || ''))
        }
      }
      // language() {
      //   this.destroyTinymce()
      //   this.$nextTick(() => this.initTinymce())
      // }
    },
    mounted() {
      this.initTinymce()
    },
    activated() {
      this.initTinymce()
    },
    deactivated() {
      this.destroyTinymce()
    },
    destroyed() {
      this.destroyTinymce()
    },
    methods: {
      initTinymce() {
        const _this = this
        window.tinymce.init({
          language: this.languageTypeList.zh,
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
          menubar: this.menubar,
          // menu: this.menu,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px',
          link_title: false,
          nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
          valid_children: '+body[style]',
          init_instance_callback: editor => {
            if (_this.value) {
              editor.setContent(_this.value)
            }
            _this.hasInit = true
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.hasChange = true
              this.$emit('input', editor.getContent())
            })
          },
          setup(editor) {
            editor.on('FullscreenStateChanged', (e) => {
              _this.fullscreen = e.state
            })
            editor.on('blur', () => {
              _this.$emit('blur')
            })
            editor.on(
              'init', () => {
                _this.$nextTick(() => {
                  _this.$emit('set-content', editor.getContent())
                })
              }
            )
          }
        })
      },
      destroyTinymce() {
        const tinymce = window.tinymce.get(this.tinymceId)
        if (this.fullscreen) {
          tinymce.execCommand('mceFullScreen')
        }

        if (tinymce) {
          tinymce.destroy()
        }
      },
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value)
      },
      getContent() {
        window.tinymce.get(this.tinymceId).getContent()
      }
    }
  }
</script>

<style scoped>
  .tinymce-container {
    position: relative;
    line-height: normal;
  }

  .tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }

  /*.editor-custom-btn-container {*/
  /*position: absolute;*/
  /*bottom: 2px;*/
  /*right: 15px;*/
  /*z-index: 30;*/
  /*height: 28px;*/
  /*line-height: 28px;*/
  /*width: 280px;*/
  /*background-color: #ffffff;*/
  /*}*/
  /*.editor-custom-btn-container .text{*/
  /*float: right;*/
  /*padding-right: 30px;*/
  /*color: #595959;*/
  /*}*/
</style>
