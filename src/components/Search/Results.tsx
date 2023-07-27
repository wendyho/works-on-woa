import type { CollectionEntry } from "astro:content";
import "solid-js";
import { For, createEffect, createResource } from "solid-js";

const getProject = async (result: any) => {
  return await result.data();
};

const Result = ({ result }: { result: any }) => {
  const [project] = createResource(result, getProject);

  createEffect(() => console.log(project()));

  return (
    <a href={project()?.url} class="cursor-pointer">
      <li class="flex flex-row items-center bg-white text-black rounded-2xl mb-2">
        <div class="p-5">
          <img src={project()?.meta.image} width="50px" />
        </div>
        <div class="border-l border-gray-500 basis-full">
          <h2 class="font-bold text-2xl p-3 ">{project()?.meta.title}</h2>
          <div class="px-3 flex flex-row gap-3 mb-3">
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

const Results = ({ results }: { results: any }) => {
  return (
    <ul>
      <For each={results()?.results}>
        {(result) => <Result result={result} />}
      </For>
    </ul>
  );
};

export default Results;
