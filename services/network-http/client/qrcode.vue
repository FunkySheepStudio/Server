<script lang="ts">
export default {
  props: {
    data: String,
  },
  data() {
    return {
    }
  },
  mounted() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js')
    document.head.append(recaptchaScript)

    let scriptIsReady = false;
    const self = this;
    let checkInterval = setInterval(function () {
      if (QRCode) {
        scriptIsReady = true;
        clearInterval(checkInterval);
        self.generate()
      }
      return scriptIsReady;
    }, 500);
  },
  methods: {
    generate: function() {
      const contenedorQR = document.getElementById('contenedorQR');
      const formulario = document.getElementById('formulario');
      const word = document.getElementById('word');
      const QR = new QRCode(contenedorQR);
      const container = document.getElementById("container");
      QR.makeCode(this.data)
    }
  }
}
</script>

<template>
  <div>
    <div id="contenedorQR" class="contenedorQR"></div>
  </div>
</template>

<style>
</style>