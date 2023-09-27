import type { CollectionEntry } from "astro:content";
import "solid-js";
import {
  For,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { AiFillCaretDown } from "solid-icons/ai";

const CategoryDropdown = ({
  categories,
  slug,
}: {
  categories: CollectionEntry<"categories">[];
  slug: string;
}) => {
  const [results, setResults] = createSignal<typeof categories>(categories);
  const [showResults, setShowResults] = createSignal<boolean>(false);

  const [selected, setSelected] = createSignal<
    CollectionEntry<"categories">["slug"] | undefined
  >(categories[0].slug);
  const onShowResults = () => {
    console.log("button click");
  };

  let categoryRef: HTMLDivElement;
  const handleClickCategory = (event: MouseEvent) => {
    console.log(categoryRef.contains(event.target as Node));
    if (!categoryRef.contains(event.target as Node)) {
      console.log("click outside");
      setShowResults(false);
      setResults(categories);
      return;
    }
    setShowResults(true);
  };

  onMount(() => {
    document.addEventListener("click", handleClickCategory);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClickCategory);
  });

  const onSearchCategory = (e: { currentTarget: HTMLInputElement }) => {
    if (!e || !e.currentTarget) return;
    const newResults = categories.filter(
      (category) =>
        Object.values(category.data).filter((val) =>
          val.toLowerCase().includes(e.currentTarget.value.toLowerCase())
        ).length > 0
    );
    setSelected(newResults[0] ? newResults[0].slug : undefined);

    setResults(newResults);
  };

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && selected()) {
      window.location.href = `/${selected()}/1`;
    }
  };

  return (
    <div class="relative mb-6" ref={categoryRef!}>
      <div class="flex items-center justify-center gap-2 relative">
        <p class="text-xl h-8">Category: </p>
        <span>
          <Show
            when={showResults()}
            fallback={
              <button
                class="h-full text-xl flex items-center gap-2"
                onClick={onShowResults}
              >
                <span class="h-8">
                  {slug === "all"
                    ? "All"
                    : categories.find((cat) => cat.slug === slug)?.data.name}
                </span>
                <div class="flex flex-col justify-center items-center">
                  <AiFillCaretDown fill="white" size={12} />
                </div>
              </button>
            }
          >
            <input
              type="text"
              autofocus
              class="text-white bg-transparent h-full border-none px-2 focus:outline-none focus:ring-gray-300"
              placeholder={
                categories.find((cat) => cat.slug === slug)?.data.name
              }
              id="myInput"
              onInput={onSearchCategory}
              onKeyPress={onKeyPress}
            />
          </Show>
        </span>
      </div>
      <Show when={showResults()}>
        <ul class="bg-white absolute w-full rounded-md shadow-xl py-2 mt-1 max-w-md left-0 right-0 m-auto">
          <For each={results()}>
            {(result) => (
              <a
                class="w-full h-full  focus:outline-none"
                href={`/${result.slug}/1`}
                onMouseOver={() => {
                  setSelected(result.slug);
                }}
                onFocus={() => {
                  setSelected(result.slug);
                }}
              >
                <li
                  class={"text-black py-2 px-4  w-full "}
                  classList={{
                    ["bg-blue-300"]: selected() === result.slug,
                  }}
                >
                  {result.data.name}
                </li>
              </a>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default CategoryDropdown;
