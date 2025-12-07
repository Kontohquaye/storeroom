import { fetchStore } from "@/lib/actions";
import DisplayStore from "./DisplayStore";
import EmptySearchPage from "./EmptySearchPage";

const SearchResults = async ({ query }: { query: string }) => {
  const storesList = await fetchStore();
  // console.log(storesList);
  const matchStores = storesList.filter((store) =>
    store.name.toLowerCase().includes(query.toLowerCase())
  );
  // console.log({ match: matchStores });
  return (
    <div className="content">
      <h1>
        Results for <b>{`${query}`}</b>
      </h1>
      {matchStores.length > 0 && <DisplayStore stores={matchStores} />}
      {matchStores.length <= 0 && <EmptySearchPage />}
    </div>
  );
};

export default SearchResults;
