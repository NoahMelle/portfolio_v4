module.exports = {
  apps: [{
    name: "cms",
    script: "bun",
    args: "run start",
    cwd: "./cms",
  },
  {
    name: "portfolio_main",
    script: "bun",
    args: "run start",
    cwd: "./main",
  },
  {
    name: "websocket",
    script: "./index.ts",
    interpreter: "bun",
    cwd: "./websocket",
  }
  ]
}
