const fs = require('fs')
const selfsigned = require('selfsigned')

module.exports = (app) => {
  let pems = {}
  // Find a local certificate file
  if (fs.existsSync('./data/ssl.cert') && fs.existsSync('./data/ssl.key')) {
    pems.cert = fs.readFileSync('./data/ssl.cert')
    pems.private = fs.readFileSync('./data/ssl.key')
  } else {
    // Generate a self signed certificate
    const attrs = [{ name: 'commonName', value: 'localhost' }]
    const opts = {
      keySize: 2048, // the size for the private key in bits (default: 1024)
      days: 30, // how long till expiry of the signed certificate (default: 365)
      algorithm: 'sha256', // sign the certificate with specified algorithm (default: 'sha1')
      extensions: [{ name: 'basicConstraints', cA: true }], // certificate extensions array
      pkcs7: true, // include PKCS#7 as part of the output (default: false)
      clientCertificate: true, // generate client cert signed by the original key (default: false)
      clientCertificateCN: 'jdoe' // client certificate's common name (default: 'John Doe jdoe123')
    }
    pems = selfsigned.generate(attrs, opts)
  }

  app.certificate = pems
}
