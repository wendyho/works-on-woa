import { For, type Accessor, Setter, JSX, createMemo, Show } from "solid-js";
const visiblePages = 5;
const PAGE_SIZE = 10;

export const getPageNumbers = (currentPage: number, total: number) => {
  const offset = Math.floor(visiblePages / 2);
  if (total < visiblePages) {
    return Array.from({ length: Number(total) }, (_, i) => i + 1);
  }
  if (currentPage <= offset) {
    return Array.from({ length: Number(visiblePages) }, (_, i) => i + 1);
  }

  if (currentPage + offset > total) {
    return Array.from(
      { length: Number(visiblePages) },
      (_, i) => i + total - visiblePages
    );
  }
  return Array.from(
    { length: Number(visiblePages) },
    (_, i) => i + (currentPage - offset)
  );
};

const Pagination = ({
  pageCount,
  page,
  setPage,
  total,
}: {
  page: Accessor<number>;
  pageCount: Accessor<number>;
  setPage: Setter<number>;
  total: number;
}) => {
  const onClickPageNumber: JSX.EventHandlerUnion<
    HTMLButtonElement,
    MouseEvent
  > = (e) => {
    const pageNumber = e.target.attributes.getNamedItem("data-page-number")
      ?.value as unknown as number;
    setPage(Number(pageNumber));
  };

  const onNextPage: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    e
  ) => {
    setPage(page() + 1);
  };

  const onPrevPage: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    e
  ) => {
    setPage(page() - 1);
  };

  const onLastPage: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    e
  ) => {
    setPage(pageCount());
  };
  const onFirstPage: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (
    e
  ) => {
    setPage(0);
  };
  const pageNumbers = createMemo(() => getPageNumbers(page(), pageCount()));
  return (
    <nav class="flex flex-col w-full items-center gap-3 my-4">
      <ul class="flex items-center -space-x-px h-10 text-base">
        <Show when={pageCount() > 1 && page() > 1}>
          <li>
            <button onClick={onPrevPage} class="pagination-button rounded-l-lg">
              <span class="sr-only">Previous</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
        </Show>
        <For each={pageNumbers()}>
          {(pageNumber: number) => (
            <li>
              <button
                data-page-number={pageNumber}
                onClick={onClickPageNumber}
                classList={{
                  ["bg-neutral-700 text-white font-bold"]:
                    page() === pageNumber,
                }}
                class="pagination-button"
              >
                {pageNumber}
              </button>
            </li>
          )}
        </For>
        <Show when={pageCount() > 1 && page() < pageCount()}>
          <li>
            <button onClick={onNextPage} class="pagination-button rounded-r-lg">
              <span class="sr-only">Next</span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </Show>
      </ul>
      <span class="text-sm text-neutral-300">
        Page <span class="font-semibold text-white ">{page()}</span> of{" "}
        <span class="font-semibold text-white ">{pageCount()}</span>
      </span>
    </nav>
  );
};
export default Pagination;
