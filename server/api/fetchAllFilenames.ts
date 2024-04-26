// server/api/files.ts
import { promises as fs } from 'node:fs'
// import fs from 'node:fs'
import path from 'node:path'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const logsDir = path.resolve('logs')
  console.log(logsDir)

  // Helper function to asynchronously find all files
  const findFiles = async (dir: string): Promise<string[]> => {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    const files = await Promise.all(entries.map((entry) => {
      const fullPath = path.join(dir, entry.name)
      return entry.isDirectory() ? findFiles(fullPath) : fullPath
    }))

    return files.flat().filter(file => path.extname(file) === '.json')
  }

  const fileNames = await findFiles(logsDir).then(files =>
    files.map(file => path.relative(logsDir, file)),
  )

  // Log the list of file names
  console.log('JSON Files Found: \n', fileNames)

  return fileNames
}

// Option 2:

// export default defineEventHandler(async (event) => {
//   const logsDir = path.resolve('logs')
//   const fileNames = []

//   fs.readdirSync(logsDir).forEach((subDir) => {
//     const subDirPath = path.join(logsDir, subDir)
//     if (fs.statSync(subDirPath).isDirectory()) {
//       fs.readdirSync(subDirPath).forEach((file) => {
//         if (path.extname(file) === '.json')
//           fileNames.push(path.join(subDir, file))
//       })
//     }
//   })

//   return fileNames
// })
