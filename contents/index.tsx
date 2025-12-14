import { Button } from "antd"
import type { PlasmoCSConfig, PlasmoRender } from "plasmo"
import { useEffect } from "react"
import { createRoot } from "react-dom/client"

import AutoFillFactory from "./crawler/factory"

export const HOST_ID = "jobright-helper-plugin"

export const autofillInstance = AutoFillFactory.create()

const JobrightHelper: React.FC = () => {
  if (window.self !== window.top) return null

  const handleAutoFill = () => {
    if (autofillInstance) {
      autofillInstance.fillForm()
    }
  }

  return (
    <div style={{ position: "fixed", right: 20, top: 20, zIndex: 1000 }}>
      <Button type="primary" onClick={handleAutoFill}>
        Auto Fill Form
      </Button>
    </div>
  )
}

export const render: PlasmoRender<any> = async ({
  anchor,
  createRootContainer
}) => {
  const rootContainer = await createRootContainer(anchor)
  const root = createRoot(rootContainer)
  root.render(<JobrightHelper />)
}

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
  exclude_matches: ["*://*.cloudflare.com/*"],
  run_at: "document_idle"
}
