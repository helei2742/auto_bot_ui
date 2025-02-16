import axios from 'axios'

export async function getAppPathImageBase64(path) {
  const response = await axios.get(
    'http://localhost:10111/image/app?name=' + path,
    { responseType: 'arraybuffer' }
  );

  // 将图片内容转换为 Base64
  const base64 = btoa(
    new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  return `data:image/png;base64,${base64}`
}
