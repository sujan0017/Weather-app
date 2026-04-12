

function SearchBar({ onHandleSearch, city, setCity }) {
  return (
    <div className="flex gap-2 justify-center">
      <input
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className=" bg-gray-100 dark:bg-gray-600 dark:text-white w-3/4 rounded-md p-2 "
        type="text"
        placeholder="Enter the City."
      />

      <button
        className="bg-blue-500 rounded-md px-3 py-1 float-end dark:text-white"
        type="submit"
        onClick={onHandleSearch}
      >
        Submit
      </button>
    </div>
  );
}

export default SearchBar;
