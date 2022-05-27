import { createReadStream, constants } from 'fs'
import { stat, access } from 'fs/promises'
import { join, sep } from 'path'
import mime from 'mime-types'

const baseDir = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

export default async function staticHandler(req, res) {
  // Parse the request URL.
  const url = new URL(req.url, `http://${req.headers.host}`)

  // Clean the path.
  const filePath = await cleanPath(url.pathname)

  // Check if the file exists.
  if (filePath) {
    // Found!
    res.statusCode = 200

    // Here you can set headers like Cache-Control, etc.
    res.setHeader('Content-Type', mime.lookup(filePath) || undefined)

    // Stream the file to the response.
    createReadStream(filePath).pipe(res)
  } else {
    // Oh no, file does not exist.
    res.statusCode = 404
    res.end('404 Not found')
  }
}

// Clean up request path so we can use it to open a file.
// NOTE: This is a naive implementation and should not be used in production.
async function cleanPath(path) {
  // Remove ".." segments
  path = path.replace(/\/\.\.(?=\/)/g, '')
  // Remove duplicate /
  path = path.replace(/\/+(?=\/)/g, '')
  // Remove starting /
  path = path.replace(/^\/+/, '')

  // Convert to FS path
  path = path.split('/').join(sep)

  // Prepend the baseDir.
  path = join(baseDir, path)

  // Check if file exists.
  if (await isValidFile(path)) {
    return path
  }

  // Check if an index file exists.
  path = join(path, 'index.html')
  if (await isValidFile(path)) {
    return path
  }

  return null
}

async function isValidFile(path) {
  try {
    // Check if we can read the file (throws an error if not).
    await access(path, constants.R_OK)

    // Check if the path exists as a file (and not directory).
    const fileStat = await stat(path)
    return fileStat.isFile()
  } catch (err) {
    return false
  }
}
