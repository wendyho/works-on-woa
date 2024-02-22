import "solid-js";
import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal,
  type Accessor,
  type Resource,
} from "solid-js";
import Pagination from "./Pagination";
import type { JSX } from "solid-js/h/jsx-runtime";
import type { SearchQuery } from "./PageFind";

const getProject = async (result: any) => {
  return await result.data();
};



const PAGE_SIZE = 10;

const Result = ({
  result,
  onClickFilterLink,
  type,
}: {
  result: any;
  onClickFilterLink: JSX.CustomEventHandlersCamelCase<HTMLButtonElement>["onClick"];
  type: "applications" | "games"
}) => {
  const [project] = createResource(result, getProject);
  
  
  
  return (
    <Show when={!!project()} fallback={<div class="min-h-24" />}>
      <li class="flex flex-col sm:flex-row bg-white bg-opacity-10 text-white rounded-md mb-2 no-underline min-h-28">
        <article class="flex flex-row items-center ">
          <div class="m-5 w-[50px]">
            <a href={project().url} class="cursor-pointer">
              <img
                src={project().meta.image}
                class="max-h-[50px] min-w-[50px] mx-auto"
                height="50px"
                width="50px"
                alt={`${project().name} logo`}
              />
            </a>
          </div>
          <div class="border-l border-gray-500 flex-grow">
            <a href={project().url} class="cursor-pointer">
              <h2 class="font-bold text-lg md:text-xl p-3 ">
                {project()?.meta.title}
              </h2>
            </a>
            <div class="px-3 flex flex-col sm:flex-row gap-3 mb-3 flex-wrap">
              <p class="flex gap-2 flex-wrap">
                <b>Categories: </b>
                {/* <span>{project().filters.categories.join(", ")}</span>
                 */}
                <span class="flex flex-wrap gap-1">
                  <For each={project().filters.category}>
                    {(cat: string) => (
                      <button
                        class="text-blue-300 underline after:content-[','] last:after:content-[''] inline"
                        // href={`/?category=${cat}`}
                        data-filter-type="category"
                        data-filter-selection={cat}
                        onClick={onClickFilterLink}
                      >
                        {cat}
                      </button>
                    )}
                  </For>
                </span>
              </p>
              <Show when={type === "applications"}>
              <p>
                <b>Compatibility: </b>
                <span>{project().filters.compatibility.join(", ")}</span>
              </p>
              <p class="break-all text-orange-200">
                <b>Version:&nbsp;</b>
                <span class="min-w-0">{project()?.meta.versionFrom}</span>
              </p>
              </Show>
              <Show when ={type === "games"}>
              <p>
                <b>Publisher: </b>
                <span>{project()?.meta.publisher}</span>
              </p>
              <p class="break-all text-orange-200">
                <b>Frame rate: </b>
                <span class="min-w-0">{project()?.meta.frame_rate}</span>
              </p>
              </Show>
            
             
            </div>
          </div>
        </article>
        <a
          class="p-5 text-5xl text-blue-500 cursor-pointer align-middle hidden flex-grow-0 sm:block sm:flex-grow text-right"
          href={project().url}
        >
          »
        </a>
      </li>
    </Show>
  );
};

const Results = ({
  results,
  search,
  clearSearch,
  setFilter,
  type,
}: {
  results: Resource<any>;
  search: Accessor<SearchQuery>;
  clearSearch: () => void;
  setFilter: (filter: string, selection: string, value: boolean, ) => void;
  type: "applications" | "games"

}) => {
  const [page, setPage] = createSignal(1);
  const [pageCount, setPageCount] = createSignal(0);
  const [paginatedResults, setPaginatedResults] = createSignal([]);

  createEffect(() => {
    setPageCount(Math.ceil(results()?.results?.length / 10));
  });

  createEffect(() => {
    setPaginatedResults(
      results()?.results.slice((page() - 1) * PAGE_SIZE, page() * PAGE_SIZE)
    );
  });

  createEffect(() => {
    if (search()) {
      setPage(1);
    }
  });

  const onClickFilterLink: JSX.CustomEventHandlersCamelCase<HTMLButtonElement>["onClick"] =
    (e) => {
      const filter =
        e.target.attributes.getNamedItem("data-filter-type")!.value;
      const selection = e.target.attributes.getNamedItem(
        "data-filter-selection"
      )!.value;
      clearSearch();
      setFilter(filter, selection, true,);
    };
  
   
  return (
    <div class={`w-full my-6`}>
      <Switch>
        <Match when={results.loading}>
          <div class="w-full flex flex-col items-center gap-3 p-10 ">
            Loading results...
          </div>
        </Match>
        <Match when={results().results.length > 0}>
          <div class="flex flex-col">
            <ul>
              <For each={paginatedResults()}>
                {(result) => (
                  <Result
                    result={result}
                    type={type}
                    onClickFilterLink={onClickFilterLink}
                  />
                )}
              </For>
            </ul>
            <Pagination
              page={page}
              pageCount={pageCount}
              setPage={setPage}
              total={results()?.results.length}
            />
          </div>
        </Match>
        <Match when={results().results.length === 0}>
          <div class="w-full flex flex-col items-center gap-3 p-10">
            No Results
            <button
              class="px-10 py-2 bg-white hover:bg-slate-300 border-white text-black font-bold border rounded-full"
              onClick={clearSearch}
            >
              Clear search
            </button>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default Results;
