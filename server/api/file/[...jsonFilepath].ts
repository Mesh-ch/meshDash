// server/api/file.ts
import fs from 'node:fs'
import path from 'node:path'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Check if event.context.params is defined
  if (!event.context.params) {
    event.node.res.statusCode = 400
    return { error: 'Missing file path' }
  }

  // Extract the filename from the URL query parameters
  const filePath = event.context.params.jsonFilepath as string
  const fullPath = path.resolve('logs', filePath)

  try {
    // Asynchronously read the content of the JSON file
    const data = await fs.promises.readFile(fullPath, 'utf-8')
    // Parse the JSON content and return it
    return JSON.parse(data)
  }
  catch (error) {
    // If an error occurs (e.g., file not found), return a 404 status code
    event.node.res.statusCode = 404
    return { error: 'File not found or invalid JSON' }
  }
})
