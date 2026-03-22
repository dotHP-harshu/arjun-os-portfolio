import userData from "../data/data.json"
import { ExternalLink, Code } from "lucide-react"

function ProjectApp() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {userData.projects.map((p, i) => (
        <div 
          key={i} 
          className="border-2 p-3 shadow-[2px_2px_0px_0px_var(--border)] transition-all flex flex-col"
          style={{ backgroundColor: 'var(--window-bg)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-bold uppercase text-sm mb-1">{p.title}</h3>
          <p className="text-xs opacity-70 mb-2 flex-1">{p.description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {p.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 border" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', borderColor: 'var(--border)' }}>{tag}</span>
            ))}
          </div>
          
          <div className="flex gap-2 mt-auto">
            {p.live && (
              <a 
                href={p.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border-2 text-[10px] font-bold uppercase transition-all active:translate-y-[2px] hover:opacity-80"
                style={{ backgroundColor: 'var(--accent)', color: '#000', borderColor: 'var(--border)', boxShadow: '2px 2px 0px 0px var(--border)' }}
              >
                <ExternalLink size={12} />
                Live
              </a>
            )}
            {p.code && (
              <a 
                href={p.code} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 border-2 text-[10px] font-bold uppercase transition-all active:translate-y-[2px] hover:opacity-80"
                style={{ backgroundColor: 'var(--window-bg)', color: 'var(--text)', borderColor: 'var(--border)', boxShadow: '2px 2px 0px 0px var(--border)' }}
              >
                <Code size={12} />
                Code
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectApp