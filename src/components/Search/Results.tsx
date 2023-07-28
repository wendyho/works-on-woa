import "solid-js";
import { For, Show, createEffect, createResource } from "solid-js";

const getProject = async (result: any) => {
  return await result.data();
};

const Result = ({ result }: { result: any }) => {
  const [project] = createResource(result, getProject);

  return (
    <a href={project()?.url} class="cursor-pointer">
      <li class="flex flex-row items-center bg-black bg-opacity-30 text-white rounded-md mb-2">
        <div class="p-5">
          <img src={project()?.meta.image} width="50px" />
        </div>
        <div class="border-l border-gray-500 basis-full">
          <h2 class="font-bold text-xl p-3 ">{project()?.meta.title}</h2>
          <div class="px-3 flex flex-col sm:flex-row gap-3 mb-3">
            <p>
              <b>Categories: </b>
              <span>{project()?.filters.categories.join(", ")}</span>
            </p>
            <p>
              <b>Support: </b>
              <span>{project()?.filters.support.join(", ")}</span>
            </p>
          </div>
        </div>
      </li>
    </a>
  );
};

const Results = ({ results, search, clearSearch }: any) => {
  createEffect(() => console.log(search().query.length));

  return (
    <Show
      when={
        !search() ||
        !results() ||
        search().query.length === 0 ||
        results().results.length > 0
      }
      fallback={
        <div class="w-full flex flex-col items-center gap-3 p-10">
          No Results
          <button
            class="px-10 py-2 bg-blue-500 hover:bg-blue-700 border-white border rounded-full"
            onClick={clearSearch}
          >
            Clear search
          </button>
        </div>
      }
    >
      <ul>
        <For each={results()?.results}>
          {(result) => <Result result={result} />}
        </For>
      </ul>
    </Show>
  );
};

export default Results;
