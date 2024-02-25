import Skeleton from "../ui/skeleton";

function ProductsLoading() {
  const cards = Array.from({ length: 20 }).map((card, i) => {
    return (
      <div
        key={i}
        className="flex flex-col sm:items-center justify-between 
       rounded-xl space-y-4 p-4"
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
    <div className="w-full pt-4 grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-24">
      {cards}
    </div>
  );
}

export default ProductsLoading;
