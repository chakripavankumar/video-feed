const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGINEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file: file,
    fileName: fileName,
  });

  return result;
}

module.exports = { uploadFile };
