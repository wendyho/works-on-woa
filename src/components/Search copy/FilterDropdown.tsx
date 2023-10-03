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

const FilterDropdown = ({
  filterOptions,
  search,
  setFilter,
  results,
}: {
  filterOptions: Resource<any>;
  search: Accessor<{ query: string; filters: Filters }>;
  results: Resource<any>;
  setFilter: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"];
}) => {
  const [showFilters, setShowFilters] = createSignal(false);

  const toggleFilters = () => setShowFilters(!showFilters());

  let ref: HTMLDivElement;
  const handleClick = (event: MouseEvent) => {
    if (!ref.contains(event.target as Node)) {
      setShowFilters(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClick);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClick);
  });

  const [filterCount, setFilterCount] = createSignal(0);

  createEffect(() =>
    setFilterCount(
      Object.values(search().filters).reduce(
        (prev, option) => prev + option.length,
        0
      )
    )
  );

  return (
    <div class="basis-1/12 gap-3 relative inline-block" ref={ref!}>
      <button
        class="px-10 py-2 bg-white hover:bg-slate-300 border-white border rounded-full h-full flex items-center gap-3 text-black font-bold"
        onClick={toggleFilters}
      >
        <VsListFilter size={24} color="#000" />
        <span class="sm:whitespace-nowrap sm:min-w-[9ch]">
          Filters {filterCount() ? `(${filterCount()})` : ""}
        </span>
      </button>
      <Show when={showFilters()}>
        <div
          class="absolute bg-white block text-black p-4 w-48 rounded-md mt-2 shadow-xl border sm:right-0 z-20"
          role="listbox"
        >
          <ul class="w-full">
            <For each={Object.keys(filterOptions() || {})}>
              {(option, i) => (
                <li>
                  <b>{option[0].toUpperCase() + option.slice(1)}</b>
                  <ul class="text-black font-normal my-3">
                    <For each={Object.entries(filterOptions()[option] || {})}>
                      {(filter, i) => (
                        <li class="flex flex-row items-center">
                          <input
                            role="option"
                            type="checkbox"
                            name={filter[0]}
                            data-option={option}
                            onChange={setFilter}
                            checked={
                              search().filters[option] &&
                              search().filters[option].includes(filter[0])
                            }
                          />
                          <label for={filter[0]} class="ml-2">
                            {`${filter[0]} (${
                              results().totalFilters[option]
                                ? results().totalFilters[option][filter[0]]
                                : filterOptions()[option][filter[0]]
                            })`}
                          </label>
                        </li>
                      )}
                    </For>
                  </ul>
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </div>
  );
};

export default FilterDropdown;
