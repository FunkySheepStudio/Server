<template>
  <div id="unity-container" class="unity-desktop">
    <canvas id="unity-canvas" />
    <div id="unity-loading-bar">
      <div id="unity-logo" />
      <div id="unity-progress-bar-empty">
        <div id="unity-progress-bar-full" />
      </div>
    </div>
    <div id="unity-mobile-warning">
      WebGL builds are not supported on mobile devices.
    </div>
    <div id="unity-footer">
      <div id="unity-webgl-logo" />
      <div id="unity-fullscreen-button" />
      <div id="unity-build-title">
        Client
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnityWebGL',
  props: {
    path: {
      type: String,
      default: '/'
    },
    game: {
      type: String,
      default: 'Client'
    },
    companyName: {
      type: String,
      default: 'DefaultCompany'
    },
    productVersion: {
      type: String,
      default: '0.1'
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {}
  },
  beforeMount () {},
  mounted () {
    const buildUrl = this.path + this.game + '/Build/'
    const loaderUrl = buildUrl + '/' + this.game + '.loader.js'
    const config = {
      dataUrl: buildUrl + '/' + this.game + '.data',
      frameworkUrl: buildUrl + '/' + this.game + '.framework.js',
      codeUrl: buildUrl + '/' + this.game + '.wasm',
      streamingAssetsUrl: 'StreamingAssets',
      companyName: this.companyName,
      productName: this.game,
      productVersion: this.productVersion
    }

    const container = document.querySelector('#unity-container')
    const canvas = document.querySelector('#unity-canvas')
    const loadingBar = document.querySelector('#unity-loading-bar')
    const progressBarFull = document.querySelector('#unity-progress-bar-full')
    const fullscreenButton = document.querySelector('#unity-fullscreen-button')
    const mobileWarning = document.querySelector('#unity-mobile-warning')

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = 'unity-mobile'
      config.devicePixelRatio = 1
      mobileWarning.style.display = 'block'
      setTimeout(() => {
        mobileWarning.style.display = 'none'
      }, 5000)
    } else {
      canvas.style.width = this.width
      canvas.style.height = this.height
    }
    loadingBar.style.display = 'block'

    const script = document.createElement('script')
    script.src = loaderUrl
    script.onload = () => {
      /* eslint-disable */
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + '%';
      }).then((unityInstance) => {
        this.$emit('loaded')
        loadingBar.style.display = 'none'
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1)
        }
      }).catch((message) => {
        alert(message)
      })
      /* eslint-enable */
    }
    document.body.appendChild(script)
  },
  methods: {}
}
</script>
