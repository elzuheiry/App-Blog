export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <img
          src={avatar}
          className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden"
          alt={username}
        />
        <h2 className="text-sm">{username}</h2>
      </div>

      <div className="my-4">
        <p>{description}</p>
      </div>

      <div>{children}</div>
    </div>
  );
}
