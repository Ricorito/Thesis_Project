import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import categories from "../../json/community/communityCategories.json";

const CommunityFilter = ({ value, onChange, sort, setSort }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
      <div className="w-full md:max-w-sm">
        <label className="block text-sm font-medium mb-2">Filter by Category</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(({ label, value }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ha sort-ot is használsz */}
      <div className="w-full md:max-w-xs">
        <label className="block text-sm font-medium mb-2">Sort Posts</label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CommunityFilter;
