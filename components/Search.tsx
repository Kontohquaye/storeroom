"use client";
import Form from "next/form";
import { Search } from "lucide-react";
import ResetSearch from "./SearchFormReset";
import { useRef } from "react";

const SearchBox = ({ query }: { query?: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form
      action={"/dashboard"}
      ref={formRef}
      className="search-form relative flex items-center bg-white mb-10 focus:bg-none  border-2 rounded-full border-[#333] overflow-hidden dark:bg-black"
    >
      <input
        name="query"
        placeholder="search store"
        className="max-w-30  sm:max-w-xl  flex-auto rounded-md px-3.5 py-2 text-base  placeholder:text-gray-500 focus:outline-none sm:text-sm/6 dark:bg-black dark:text-amber-50"
        defaultValue={query}
      />
      <div className="btn-group  flex items-center gap-1 p-1.5">
        <button className="search px-0.5 " type="submit">
          <Search className="hover:text-red-400 hover:cursor-pointer" />
        </button>
        {query && <ResetSearch ref={formRef} />}
      </div>
    </Form>
  );
};

export default SearchBox;
