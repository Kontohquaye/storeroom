import { SiteHeader } from "@/components/PageHeader";
import SearchBox from "@/components/Search";
import SearchResults from "@/components/SearchResults";
import StoreRoom from "@/components/Store";

const DashContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  // console.log(query);
  const heading = "Dashboard";
  return (
    <div className="content ">
      <SiteHeader heading={heading} />
      <header className="flex justify-end p-0 mt-2">
        <SearchBox query={query} />
      </header>
      <main>{query ? <SearchResults query={query} /> : <StoreRoom />}</main>
    </div>
  );
};

export default DashContent;
