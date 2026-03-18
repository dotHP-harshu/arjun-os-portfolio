import userData from "../data/data.json"

const AboutApp = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div
          className="w-32 h-32 border-2 overflow-hidden"
          style={{
            borderColor: "var(--border)",
            boxShadow: "4px 4px 0px 0px var(--border)",
            backgroundColor: "var(--accent)",
          }}
        >
          <img
            src={userData.profile.avatar}
            alt={userData.profile.name}
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-1">
            {userData.profile.name}
          </h2>
          <p
            className="text-xs font-bold uppercase px-2 py-0.5 inline-block mb-4"
            style={{ backgroundColor: "var(--border)", color: "var(--bg)" }}
          >
            {userData.profile.role}
          </p>
          <p className="text-sm leading-relaxed font-medium">
            {userData.profile.bio}
          </p>
        </div>
      </div>
      <div className="border-t-2 pt-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-xs font-bold uppercase mb-2 tracking-widest">
          System Specs:
        </h3>
        <ul className="text-xs space-y-1 font-mono">
          <li>• Location: {userData.profile.location}</li>
          <li>• Experience: {userData.profile.experience}</li>
          <li>• Status: {userData.profile.status}</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutApp;
