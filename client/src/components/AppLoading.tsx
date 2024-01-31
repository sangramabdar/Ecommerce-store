function AppLoading() {
  const cards = Array.from({ length: 20 }).map((card, i) => {
    return (
      <div
        key={i}
        className="w-full relative animate-pulse h-56 shimmer rounded-md bg-secondary"
      ></div>
    );
  });

  return (
    <div className="bg-primary p-4">
      <div className="w-full bg-slate-200 animate-pulse h-10 relative shimmer rounded-md"></div>
      <div className="w-full pt-4 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {cards}
      </div>
    </div>
  );
}

export default AppLoading;
