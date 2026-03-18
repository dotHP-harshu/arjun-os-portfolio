import userData from "../data/data.json"

function ExperienceApp() {
  return (
     <div className="space-y-6">
                  {userData.experience.map((exp, i) => (
                    <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: 'var(--accent)' }}>
                      <div className="absolute -left-1.75 top-0 w-3 h-3 border-2" style={{ backgroundColor: 'var(--border)', borderColor: 'var(--window-bg)' }} />
                      <h3 className="font-bold text-sm uppercase">{exp.role}</h3>
                      <p className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{exp.company}</p>
                      <p className="text-[10px] font-mono opacity-50">{exp.period}</p>
                      <p className="text-xs mt-1 leading-relaxed opacity-80">{exp.description}</p>
                    </div>
                  ))}
                </div>
  )
}

export default ExperienceApp