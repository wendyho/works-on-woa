import "solid-js";
import {
  createEffect,
  createResource,
  createSignal,
  lazy,
  onMount,
} from "solid-js";

const bundlePath = `${import.meta.env.BASE_URL}_pagefind/`;
const pagefind = await import(`${bundlePath}pagefind.js`);

const fetchResults = async ({ text, filters }) => {
  return await pagefind.search(text);
};

const fetchFilterOptions = async () => {
  return await pagefind.filters();
};

const PageFindNew = () => {
  const [search, setSearch] = createSignal({
    text: "",
    filters: {},
  });
  const [results] = createResource(search, fetchResults);
  const [filterOptions] = createResource(search, fetchFilterOptions);

  createEffect(() => console.log(search()));

  const [showFilters, setShowFilters] = createSignal(false);

  const toggleFilters = () => setShowFilters(!showFilters());

  const setFilter = (e) => {
    const prev = search();
    const option = e.currentTarget.dataset.option;
    const { checked, name } = e.currentTarget;
    const prevFilter = prev.filters[option] || [];
    setSearch({
      ...prev,
      filters: {
        ...prev.filters,
        [option]: [
          ...prevFilter.filter((item) => checked || item === name),
          ...(checked ? [name] : []),
        ],
      },
    });
  };

  return (
    <div class="w-full flex flex-row justify-between gap-3 items-stretch">
      <input
        placeholder="Search for projects"
        value={search().text}
        onInput={(e) =>
          setSearch({
            ...search(),
            text: e.currentTarget.value,
          })
        }
        class="text-black basis-11/12 py-5 px-10 rounded-full"
      />
      <div class="basis-1/12 gap-3 relative inline-block">
        <button
          class="px-10 py-2 bg-blue-500 border-white border rounded-full h-full"
          onClick={toggleFilters}
        >
          Filter
        </button>
        <Show when={showFilters()}>
          <div class="absolute bg-white block text-black p-4 w-36">
            <ul class="w-full">
              <For each={Object.keys(filterOptions() || {})}>
                {(option, i) => (
                  <li class="font-bold">
                    {option[0].toUpperCase() + option.slice(1)}
                    <ul class="text-black font-normal">
                      <For each={Object.entries(filterOptions()[option] || {})}>
                        {(filter, i) => (
                          <li>
                            <input
                              type="checkbox"
                              name={filter[0]}
                              data-option={option}
                              onChange={setFilter}
                              checked={
                                search().filters[option] &&
                                search().filters[option].includes([filter[0]])
                              }
                            />
                            <label for={filter[0]}>{filter[0]}</label>
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
    </div>
  );
};

export default PageFindNew;
