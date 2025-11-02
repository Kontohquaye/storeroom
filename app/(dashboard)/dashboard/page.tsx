import SearchBox from "@/components/Search";
import StoreRoom from "@/components/Store";

const DashContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  // console.log(query);
  return (
    <div className="content ">
      <header className="flex justify-end p-0">
        <SearchBox query={query} />
      </header>
      <main>
        <StoreRoom />
      </main>
    </div>
  );
};

export default DashContent;
