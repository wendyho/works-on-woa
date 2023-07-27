import "solid-js";
import { Accessor, For, JSX, Resource, Show, createSignal } from "solid-js";
import type { Filters } from "./PageFind";

const FilterDropdown = ({
  filterOptions,
  search,
  setFilter,
}: {
  filterOptions: Resource<any>;
  search: Accessor<{ query: string; filters: Filters }>;
  setFilter: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"];
}) => {
  const [showFilters, setShowFilters] = createSignal(false);

  const toggleFilters = () => setShowFilters(!showFilters());

  return (
    <div class="basis-1/12 gap-3 relative inline-block">
      <button
        class="px-10 py-2 bg-blue-500 border-white border rounded-full h-full"
        onClick={toggleFilters}
      >
        Filter
      </button>
      <Show when={showFilters()}>
        <div class="absolute bg-white block text-black p-4 w-36 rounded-md mt-2 shadow-xl border">
          <ul class="w-full">
            <For each={Object.keys(filterOptions() || {})}>
              {(option, i) => (
                <li>
                  <b>{option[0].toUpperCase() + option.slice(1)}</b>
                  <ul class="text-black font-normal mt-3">
                    <For each={Object.entries(filterOptions()[option] || {})}>
                      {(filter, i) => (
                        <li class="flex flex-row items-center">
                          <input
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
                            {filter[0]}
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
