import Form from "next/form";
import { Search } from "lucide-react";
import ResetSearch from "./SearchFormReset";

const SearchBox = ({ query }: { query?: string }) => {
  return (
    <Form
      action={"/dashboard"}
      className="search-form relative flex items-center bg-white mb-10 focus:bg-none  border-2 rounded-full border-[#333] overflow-hidden"
    >
      <input
        name="query"
        placeholder="search store"
        className="min-w-0 flex-auto rounded-md px-3.5 py-2 text-base  placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
        defaultValue={query}
      />
      <div className="btn-group absolute right-0 flex items-center gap-1">
        <button className="search px-0.5 " type="submit">
          <Search className="hover:text-shadow-red-400 hover:cursor-pointer" />
        </button>
        <ResetSearch />
      </div>
    </Form>
  );
};

export default SearchBox;
