// pages/api/imageproxy.js
/* Use /api/imageproxy?url=${encodeURIComponent(imageURL)} for third party image url */
export default async (req, res) => {
  const url = decodeURIComponent(req.query.url)
  const result = await fetch(url)
  const body = await result.body
  body.pipe(res)
}
