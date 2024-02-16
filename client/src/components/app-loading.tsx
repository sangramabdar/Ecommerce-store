import Skeleton from "./ui/skeleton";

function AppLoading() {
  const cards = Array.from({ length: 20 }).map((card, i) => {
    return (
      <Skeleton
        key={i}
        className="w-full relative animate-pulse h-56 rounded-md"
      ></Skeleton>
    );
  });

  return (
    <div className="w-full pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 mt-24">
      {cards}
    </div>
  );
}

export default AppLoading;
