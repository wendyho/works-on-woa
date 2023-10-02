import "solid-js";
import {
  Accessor,
  For,
  JSX,
  Resource,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import type { Filters } from "./PageFind";
import { VsListFilter } from "solid-icons/vs";

const filters = [
  { key: "categories", name: "Category" },
  { key: "compatibility", name: "Compatibility" },
];

const FilterDropdown = ({
  filterOptions,
  search,
  setFilter,
  results,
}: {
  filterOptions: Resource<any>;
  search: Accessor<{ query: string | null; filters: Filters }>;
  results: Resource<any>;
  setFilter: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"];
}) => {
  const [showFilters, setShowFilters] = createSignal<Record<string, boolean>>(
    filters.reduce(
      (p, f) => ({
        ...p,
        [f.key]: false,
      }),
      {}
    )
  );

  const toggleFilters = (option: string) => {
    setShowFilters({
      ...showFilters(),
      [option]: !showFilters()[option] as boolean,
    });
  };

  let ref: HTMLDivElement;
  const handleClick = (event: MouseEvent) => {
    if (!ref.contains(event.target as Node)) {
      setShowFilters(
        filters.reduce(
          (p, f) => ({
            ...p,
            [f.key]: false,
          }),
          {}
        )
      );
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClick);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClick);
  });

  return (
    <div class=" flex" ref={ref!}>
      <For each={filters}>
        {(filter, i) => (
          <div class="relative w-36 h-full flex-shrink-0 z-10 inline-flex items-center text-sm font-medium text-center last:rounded-r-full first:rounded-l-full first:md:rounded-l-none  border-l  focus:ring-4 focus:outline-none  bg-neutral-700 hover:bg-neutral-600 focus:ring-neutral-700  text-white border-neutral-600">
            <button
              id={`filter-button-${filter.key}`}
              data-dropdown-toggle={`filter-button-${filter.key}`}
              type="button"
              class="py-2.5 px-4 h-full text-center w-full"
              onClick={() => toggleFilters(filter.key)}
            >
              {filter.name}
              {search().filters[filter.key]?.length > 0
                ? ` (${search().filters[filter.key].length})`
                : ""}
            </button>
            <Show when={showFilters()[filter.key]}>
              <div
                id={`filter-button-${filter.key}`}
                class="absolute block top-[100%] z-10 left-0 divide-y mt-2 rounded-lg shadow w-44 bg-neutral-700 "
              >
                <ul
                  class="py-2 text-sm  text-neutral-200"
                  aria-labelledby="filter-button"
                >
                  <For each={Object.entries(filterOptions()[filter.key] || {})}>
                    {(filterOption, i) => (
                      <li class="flex flex-row items-center " role="listbox">
                        <button
                          type="button"
                          class="inline-flex w-96 px-4 py-2 text-lg text-neutral-200 hover:bg-neutral-600 hover:text-white "
                        >
                          <div class="inline-flex items-center">
                            <input
                              role="option"
                              type="checkbox"
                              name={filterOption[0]}
                              id={filterOption[0]}
                              data-option={filter.key}
                              onChange={setFilter}
                              checked={
                                search().filters[filter.key] &&
                                search().filters[filter.key].includes(
                                  filterOption[0]
                                )
                              }
                            />
                            <label
                              for={filterOption[0]}
                              class="ml-2  cursor-pointer"
                            >
                              {`${filterOption[0]} (${
                                results().filters[filter.key]
                                  ? results().filters[filter.key][
                                      filterOption[0]
                                    ]
                                  : filterOptions()[filter.key][filterOption[0]]
                              })`}
                            </label>
                          </div>
                        </button>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};

export default FilterDropdown;
