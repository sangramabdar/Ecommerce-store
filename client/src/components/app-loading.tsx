import Skeleton from "./ui/skeleton";

function AppLoading() {
  const cards = Array.from({ length: 20 }).map((card, i) => {
    return (
      <div
        key={i}
        className="flex flex-col sm:items-center justify-between 
       rounded-2xl space-y-4 bg-secondary p-4"
      >
        <Skeleton className="w-full h-52" />
        <Skeleton className="h-16" />
        <div className="flex flex-col  w-full gap-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    );
  });

  return (
    <div className="w-full pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 mt-24">
      {cards}
    </div>
  );
}

export default AppLoading;
