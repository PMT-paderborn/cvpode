import React, { useState } from "react";
import SearchInput from "../components/SearchInput/SearchInput";

const Search = () => {
  const [search, setSearch] = useState("");
  
  return (
    <div>
      <SearchInput />
    </div>
  );
};

export default Search;
