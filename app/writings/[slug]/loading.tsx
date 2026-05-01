const firstGroupWidths = [
  "90%",
  "75%",
  "85%",
  "70%",
  "95%",
  "80%",
  "65%",
  "88%",
];
const secondGroupWidths = ["82%", "68%", "91%", "74%", "60%"];

export default function Loading() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <div className="mb-10">
        <div className="h-3 w-16 bg-[#242424] rounded animate-pulse" />
      </div>
      <div className="mb-10 space-y-3">
        <div className="h-5 w-4/5 bg-[#242424] rounded animate-pulse" />
        <div className="h-5 w-2/3 bg-[#242424] rounded animate-pulse" />
        <div className="mt-4 flex gap-3">
          <div className="h-3 w-24 bg-[#1c1c1c] rounded animate-pulse" />
          <div className="h-3 w-16 bg-[#1c1c1c] rounded animate-pulse" />
        </div>
      </div>
      <hr className="border-none border-t border-[#242424] mb-10" />
      <div className="space-y-3">
        {firstGroupWidths.map((width, i) => (
          <div
            key={i}
            className="h-3 bg-[#1c1c1c] rounded animate-pulse"
            style={{ width, animationDelay: `${i * 60}ms` }}
          />
        ))}
        <div className="pt-4 space-y-3">
          {secondGroupWidths.map((width, i) => (
            <div
              key={i}
              className="h-3 bg-[#1c1c1c] rounded animate-pulse"
              style={{ width, animationDelay: `${(i + 8) * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
