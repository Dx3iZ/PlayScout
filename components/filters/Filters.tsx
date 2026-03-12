import SearchBar from "./SearchBar"
import CategoryFilter from "./CategoryFilter"
import PlatformFilter from "./PlatformFilter"
import SortSelect from "./SortSelect"

export default function Filters() {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <SearchBar />
      <CategoryFilter />
      <PlatformFilter />
      <SortSelect />
    </div>
  )
}