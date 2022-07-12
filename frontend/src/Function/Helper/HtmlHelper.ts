namespace HtmlHelper {
  export const isScrolledToBottom = (
    bottomThreshold: number,
    target: HTMLElement,
  ) => target.scrollHeight - target.clientHeight - target.scrollTop <= bottomThreshold;
}

export default HtmlHelper;
