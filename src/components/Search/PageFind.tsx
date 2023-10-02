import { string } from "astro/zod";
import "solid-js";
import {
  JSX,
  Show,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  onMount,
} from "solid-js";
import FilterDropdown from "./FilterDropdown";
import Results from "./Results";
import { AiOutlineSearch } from "solid-icons/ai";
import { IoCloseOutline } from "solid-icons/io";
const bundlePath = `${import.meta.env.BASE_URL}_pagefind/`;
const pagefind = await import(/* @vite-ignore */ `${bundlePath}pagefind.js`);

export type Filters = Record<string, string[]>;

const fetchResults = async ({
  query,
  filters,
}: {
  query: string | null;
  filters: Filters;
}) => {
  return await pagefind.search(query, {
    filters,
    sort: query
      ? undefined
      : {
          name: "asc",
        },
  });
};

const fetchFilterOptions = async () => {
  return await pagefind.filters();
};

const PageFind = ({ shouldRedirect }: { shouldRedirect: boolean }) => {
  const pathParams = createMemo(() => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    return {
      query: url.searchParams.get("query"),
      category: url.searchParams.get("category")?.split(","),
      compatibility: url.searchParams.get("compatibility")?.split(","),
    };
  });

  const [search, setSearch] = createSignal<{
    query: string | null;
    filters: Filters;
  }>({
    query: pathParams().query || null,
    filters: {
      categories: pathParams().category || [],
      compatibility: pathParams().compatibility || [],
    },
  });

  const setFilter: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"] =
    (e) => {
      const prev = search();
      const option = e.currentTarget.dataset.option as string;
      console.log(option);
      const { checked, name } = e.currentTarget;
      const prevFilter = prev.filters[option] || [];
      const newSearch = {
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
      };
      setSearch(newSearch);
      setRequest(newSearch);
    };

  onMount(() => {
    window.history.replaceState({}, "", window.location.href.split("?")[0]);
  });

  const clearSearch = () => {
    setSearch({
      query: null,
      filters: {},
    });
    setRequest({
      query: null,
      filters: {},
    });
  };

  const [request, setRequest] = createSignal<{
    query: string | null;
    filters: Filters;
  }>({
    query: pathParams().query || null,
    filters: {
      categories: pathParams().category || [],
      compatibility: pathParams().compatibility || [],
    },
  });

  const onSearch: JSX.CustomEventHandlersCamelCase<HTMLFormElement>["onSubmit"] =
    (e) => {
      e.preventDefault();
      if (shouldRedirect) {
        const { query, filters } = search();
        const url = new URL(window.location.origin);
        if (query) url.searchParams.append("query", query);
        if (filters.categories.length > 0) {
          url.searchParams.append("category", filters.categories.join(","));
        }
        if (filters.compatibility.length > 0) {
          url.searchParams.append(
            "compatibility",
            filters.compatibility.join(",")
          );
        }

        window.location.href = url.toString();
      }
      setRequest(search());
    };

  const [results] = createResource(request, fetchResults);
  const [filterOptions] = createResource(request, fetchFilterOptions);

  return (
    <div class="w-full">
      <div class="w-full flex flex-col md:flex-row justify-between items-stretch mb-3 gap-3 md:gap-0">
        <form
          onSubmit={onSearch}
          class="bg-white text-black basis-11/12 rounded-full md:rounded-r-none flex flex-row py-2 px-1 items-center pl-6"
        >
          <label class="hidden" for="project-search">
            Search for projects
          </label>
          <input
            placeholder="Search for projects"
            name="project-search"
            value={search().query || ""}
            onInput={(e) =>
              setSearch({
                ...search(),
                query: e.currentTarget.value || null,
              })
            }
            class="w-full h-full px-3"
          />
          <button class="py-2 px-2" type="submit">
            <AiOutlineSearch size={24} />
          </button>
          <button class="py-2 px-2" onClick={clearSearch}>
            <IoCloseOutline size={24} />
          </button>
        </form>

        <div class="flex">
          <FilterDropdown
            search={search}
            filterOptions={filterOptions}
            setFilter={setFilter}
            results={results}
          />
        </div>
      </div>
      <Show when={!shouldRedirect}>
        <Results results={results} search={search} clearSearch={clearSearch} />
      </Show>
    </div>
  );
};

export default PageFind;
