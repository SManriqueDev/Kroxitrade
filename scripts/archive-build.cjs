const fs = require("fs")
const path = require("path")
const { spawnSync } = require("child_process")

const rootDir = path.join(__dirname, "..")
const packageJsonPath = path.join(rootDir, "package.json")
const buildDir = path.join(rootDir, "build")
const prodDir = path.join(buildDir, "chrome-mv3-prod")

if (!fs.existsSync(packageJsonPath)) {
  throw new Error("package.json not found")
}

if (!fs.existsSync(prodDir)) {
  throw new Error(`Production build folder not found: ${prodDir}`)
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
const displayName = String(packageJson.displayName || packageJson.name || "extension").trim()
const version = String(packageJson.version || "0.0.0").trim()
const safeName = displayName.replace(/[<>:"/\\|?*\u0000-\u001F]/g, "-").replace(/\s+/g, " ").trim()
const zipName = `${safeName}-${version}.zip`
const zipPath = path.join(buildDir, zipName)

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath)
}

const result = spawnSync(
  "tar",
  ["-a", "-c", "-f", zipPath, "-C", prodDir, "."],
  {
    cwd: rootDir,
    stdio: "inherit",
    shell: false
  }
)

if (result.status !== 0) {
  throw new Error(`Failed to create archive: ${zipName}`)
}

console.log(`Created ${zipPath}`)
