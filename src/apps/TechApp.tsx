import userData from "../data/data.json"

function TechApp() {
  return (
    <div className="space-y-4">
      {userData.techStack.groups.map((group, i) => (
        <div key={i}>
          <h3 className="text-[10px] font-bold uppercase opacity-50 mb-2 tracking-widest">
            {group.label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(userData.techStack[group.key as keyof typeof userData.techStack] as string[]).map((item) => (
              <span
                key={item}
                className="px-2 py-1 text-[10px] font-bold uppercase border"
                style={{
                  backgroundColor: "var(--border)",
                  color: "var(--bg)",
                  borderColor: "var(--border)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TechApp