export default function createMarkerElement(
  html: string,
  opts: {
    rootCls?: string;
  },
) {
  const el = document.createElement("div");
  el.className = opts.rootCls ?? "";
  el.innerHTML = html;

  return el;
}
