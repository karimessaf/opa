import { readdir } from 'fs/promises'
import { resolve } from 'path'

export default defineEventHandler(async () => {
  const publicDir = resolve('./public/pictures')
  const files = await readdir(publicDir)

  return files.filter(file => /\.(jpg|jpeg|JPG|JPEG)$/.test(file))
})
