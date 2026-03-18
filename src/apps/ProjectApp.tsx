
import userData from "../data/data.json"
function ProjectApp() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.projects.map((p, i) => (
                    <div key={i} className="border-2 p-3 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                         style={{ backgroundColor: 'var(--window-bg)', borderColor: 'var(--border)' }}>
                      <h3 className="font-bold uppercase text-sm mb-1">{p.title}</h3>
                      <p className="text-xs opacity-70 mb-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 border" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', borderColor: 'var(--border)' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
  )
}

export default ProjectApp