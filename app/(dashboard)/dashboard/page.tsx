import { SiteHeader } from "@/components/PageHeader";
import SearchBox from "@/components/Search";
import SearchResults from "@/components/SearchResults";
import StoreRoom from "@/components/Store";
import { auth } from "../../../auth";
import { redirect, RedirectType } from "next/navigation";

const DashContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  // console.log(query);
  const heading = "Dashboard";
  // session management
  const session = await auth();
  // console.log("Dashboard session:", session);
  if (!session?.user) {
    return redirect("/login", RedirectType.replace);
  } else
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
