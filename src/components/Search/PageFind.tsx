import {
  Show,
  createEffect,
  createMemo,
  createResource,
  createSignal,
} from "solid-js";
import FilterDropdown from "./FilterDropdown";
import Results from "./Results";
import SearchIcon from "./SearchIcon";
import ClearIcon from "./ClearIcon";
import type { JSX } from "solid-js/h/jsx-runtime";
import type { CollectionEntry, CollectionKey } from "astro:content";
const bundlePath = `${import.meta.env.BASE_URL}pagefind/`;
const pagefind = await import(/* @vite-ignore */ `${bundlePath}pagefind.js`);

export type Filters = Record<string, string[]>;

export type SearchQuery = { query: string | null; filters: Filters };

export type Results = {
  results: any[];
  totalFilters: {
    category: Record<
      CollectionEntry<
        "applications_categories" | "games_categories"
      >["data"]["name"],
      number
    >;
    type: Record<"games" | "applications", number>;
    compatibility: Record<
      CollectionEntry<"applications" | "games">["data"]["compatibility"],
      number
    >;
  };
  filters: {
    category: Record<
      CollectionEntry<
        "applications_categories" | "games_categories"
      >["data"]["name"],
      number
    >;
    type: Record<"games" | "applications", number>;
    compatibility: Record<
      CollectionEntry<"applications" | "games">["data"]["compatibility"],
      number
    >;
  };
};

const fetchResults = async ({
  query,
  filters,
}: {
  query: string | null;
  filters: Filters;
}) => {
  return await pagefind.debouncedSearch(query, {
    filters: {
      ...filters,
      category: { any: filters.category },
      compatibility: { any: filters.compatibility },
    },
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

const getQueryParams = ({ filters, query }: SearchQuery) => {
  const url = new URL(window.location.origin + "/" + filters.type[0] + "/");
  if (query) url.searchParams.append("query", query);
  if (filters.category?.length > 0) {
    url.searchParams.append("category", filters.category.join(","));
  }
  if (filters.compatibility?.length > 0) {
    url.searchParams.append("compatibility", filters.compatibility.join(","));
  }
  return url;
};

const PageFind = ({
  shouldRedirect,
  categories,
  type,
}: {
  shouldRedirect: boolean;
  type: "games" | "applications";
  categories: (
    | CollectionEntry<"games_categories">
    | CollectionEntry<"applications_categories">
  )[];
}) => {
  const pathParams = createMemo(() => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    return {
      query: url.searchParams.get("query"),
      category: url.searchParams.get("category")?.split(","),
      compatibility: url.searchParams.get("compatibility")?.split(","),
      page: url.searchParams.get("page"),
    };
  });

  const [page, setPage] = createSignal(
    pathParams().page ? Number(pathParams().page) : 1
  );

  const [search, setSearch] = createSignal<{
    query: string | null;
    filters: Filters;
  }>({
    query: pathParams().query ?? null,
    filters: {
      category: pathParams().category ?? [],
      compatibility: pathParams().compatibility ?? [],
      type: [type],
    },
  });

  const setFilter: (
    filter: string,
    selection: string,
    value: boolean
  ) => void = (filter, selection, value) => {
    const prev = search();

    const prevFilter = prev.filters[filter] ?? [];
    const newSearch = {
      ...prev,
      filters: {
        ...prev.filters,
        [filter]: [
          ...prevFilter.filter(
            (item) => (value && item === selection) || item !== selection
          ),
          ...(value ? [selection] : []),
        ],
      },
    };
    setSearch(newSearch);
    setRequest(newSearch);
    setPage(1);
    const url = getQueryParams(search());
    if (!shouldRedirect) window.history.replaceState({}, "", url.toString());
  };

  const clearSearch = () => {
    const newSearch = {
      query: null,
      filters: {
        type: [type],
      },
    };
    setSearch(newSearch);
    setRequest(newSearch);
    setPage(1);
    const url = getQueryParams(newSearch);
    window.history.replaceState({}, "", url.toString());
  };

  const [request, setRequest] = createSignal<{
    query: string | null;
    filters: Filters;
  }>({
    query: pathParams().query ?? null,
    filters: {
      category: pathParams().category ?? [],
      compatibility: pathParams().compatibility ?? [],
      type: [type],
    },
  });

  const onSearch: JSX.CustomEventHandlersCamelCase<HTMLFormElement>["onSubmit"] =
    (e) => {
      e.preventDefault();
      const url = getQueryParams(search());
      if (shouldRedirect) {
        window.location.href = url.toString();
        return;
      }
      window.history.replaceState({}, "", url.toString());
      setRequest(search());
      setPage(1);
    };

  const [results] = createResource<Results, SearchQuery>(request, fetchResults);
  const [filterOptions] = createResource(request, fetchFilterOptions);

  createEffect(() => console.log(results()));
  return (
    <div
      class={`w-full flex flex-col h-[${
        results()?.results.length ?? 10 * 7
      }rem]`}
    >
      <div class="w-full flex flex-col md:flex-row justify-between items-stretch mb-3 gap-3 md:gap-0">
        <form
          onSubmit={onSearch}
          class="bg-white text-black basis-11/12 rounded-full md:rounded-r-none flex flex-row py-2 px-1 items-center pl-6"
        >
          <label class="hidden" for="project-search">
            Search for applications
          </label>
          {type === "applications" ? (
            <input
              placeholder="Search for applications"
              name="project-search"
              value={search().query ?? ""}
              onInput={(e) =>
                setSearch({
                  ...search(),
                  query: e.currentTarget.value || null,
                })
              }
              class="w-full h-full px-3"
            />
          ) : (
            <input
              placeholder="Search for games"
              name="project-search"
              value={search().query ?? ""}
              onInput={(e) =>
                setSearch({
                  ...search(),
                  query: e.currentTarget.value || null,
                })
              }
              class="w-full h-full px-3"
            />
          )}

          <button
            class="py-2 px-2 flex items-center"
            type="submit"
            aria-label="Submit search query"
          >
            <SearchIcon />
          </button>
          <button
            class="py-2 px-2"
            onClick={clearSearch}
            aria-label="Clear search query"
          >
            <ClearIcon />
          </button>
        </form>

        <div class="flex">
          <FilterDropdown
            search={request}
            setFilter={setFilter}
            categories={categories}
            type={type}
          />
        </div>
      </div>
      <Show when={!shouldRedirect}>
        <Results
          page={page}
          setPage={setPage}
          results={results}
          search={search}
          clearSearch={clearSearch}
          setFilter={setFilter}
          type={type}
        />
      </Show>
    </div>
  );
};

export default PageFind;
