<script lang="ts">
export default {
  props: {
    qrData: String,
  },
  data() {
    return {
    }
  },
  watch: { 
    qrData: function(newVal, oldVal) { // watch it
      this.generate()
    }
  },
  mounted() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js')
    document.head.append(recaptchaScript)

    let scriptIsReady = false;
    const self = this;

    (function me() {
      if (typeof QRCode !== 'undefined') {
        scriptIsReady = true;
        const contenedorQR = document.getElementById('contenedorQR');
        self.QR = new QRCode(contenedorQR);
        self.generate()
      }

      if (!scriptIsReady)
      {
        setTimeout(me, 100);
      }
    })();
  },
  methods: {
    generate: function() {
      if (this.qrData && this.QR )
      {
        this.QR.makeCode(this.qrData)
      }
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