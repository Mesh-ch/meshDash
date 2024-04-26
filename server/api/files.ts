// server/api/files.ts

import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const logsDir = path.resolve('logs')
  const fileNames: string[] = []

  // Helper function to recursively find all files
  const findFiles = (dir: string) => {
    const files = fs.readdirSync(dir)

    for (const file of files) {
      const fullPath = path.join(dir, file)
      const isDirectory = fs.statSync(fullPath).isDirectory()

      if (isDirectory) {
        findFiles(fullPath)
      } else if (path.extname(file) === '.json') {
        fileNames.push(path.relative(logsDir, fullPath))
      }
    }
  }

  findFiles(logsDir)

  return fileNames
})
