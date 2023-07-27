import { string } from "astro/zod";
import "solid-js";
import {
  For,
  JSX,
  Show,
  createEffect,
  createResource,
  createSignal,
  lazy,
  onMount,
} from "solid-js";
import FilterDropdown from "./FilterDropdown";
import Results from "./Results";

const bundlePath = `${import.meta.env.BASE_URL}_pagefind/`;
const pagefind = await import(`${bundlePath}pagefind.js`);

export type Filters = Record<string, string[]>;

const fetchResults = async ({
  query,
  filters,
}: {
  query: string;
  filters: Filters;
}) => {
  return await pagefind.search(query, { filters });
};

const fetchFilterOptions = async () => {
  return await pagefind.filters();
};

const PageFindNew = () => {
  const [search, setSearch] = createSignal<{ query: string; filters: Filters }>(
    {
      query: "",
      filters: {},
    }
  );
  const [results] = createResource(search, fetchResults);
  const [filterOptions] = createResource(search, fetchFilterOptions);

  // createEffect(() => console.log(search(), results()));

  const setFilter: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"] =
    (e) => {
      const prev = search();
      const option = e.currentTarget.dataset.option as string;
      const { checked, name } = e.currentTarget;
      const prevFilter = prev.filters[option] || [];
      setSearch({
        ...prev,
        filters: {
          ...prev.filters,
          [option]: [
            ...prevFilter.filter(
              (item) => (checked && item === name) || item !== name
            ),
            ...(checked ? [name] : []),
          ],
        },
      });
    };

  return (
    <div class="w-full">
      <div class="w-full flex flex-col sm:flex-row justify-between gap-3 items-stretch mb-3">
        <input
          placeholder="Search for projects"
          value={search().query}
          onInput={(e) =>
            setSearch({
              ...search(),
              query: e.currentTarget.value,
            })
          }
          class="text-black basis-11/12 py-2 px-10 rounded-full"
        />
        <FilterDropdown
          search={search}
          filterOptions={filterOptions}
          setFilter={setFilter}
        />
      </div>
      <Results results={results} />
    </div>
  );
};

export default PageFindNew;
