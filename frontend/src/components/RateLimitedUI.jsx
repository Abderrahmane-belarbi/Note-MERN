export default function RateLimitedUI() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl text-[#00B7B5] font-bold tracking-tighter">
          You have reached your limit
        </h1>
        <p className="text-[#00B7B5] text-lg">Please try again later</p>
      </div>
    </div>
  );
}
