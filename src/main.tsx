import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SoundProvider } from './contexts/SoundContext'
// import { agentLog } from './debug/agentLog'

// Global error hooks for runtime evidence during debugging.
window.addEventListener('error', () => {
  // agentLog({
  //   runId: 'pre-fix',
  //   hypothesisId: 'H0',
  //   location: 'src/main.tsx:runtime-error',
  //   message: 'window.error',
  //   data: {
  //     message: event.message,
  //     filename: event.filename,
  //     lineno: event.lineno,
  //     colno: event.colno,
  //   },
  // })
})

window.addEventListener('unhandledrejection', () => {
  // const reason = (event as PromiseRejectionEvent).reason
  // agentLog({
  //   runId: 'pre-fix',
  //   hypothesisId: 'H0',
  //   location: 'src/main.tsx:unhandledrejection',
  //   message: 'window.unhandledrejection',
  //   data: {
  //     reasonType: typeof reason,
  //     reason: reason instanceof Error ? { name: reason.name, message: reason.message, stack: reason.stack } : String(reason),
  //   },
  // })
})

// agentLog({
//   runId: 'pre-fix',
//   hypothesisId: 'H0',
//   location: 'src/main.tsx:startup',
//   message: 'app.startup',
//   data: { href: window.location.href },
// })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </StrictMode>,
)
