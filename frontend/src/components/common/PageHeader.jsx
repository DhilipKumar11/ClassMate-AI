export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="section-title mt-4 text-balance">{title}</h1>
      <p className="muted mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg">{description}</p>
      {actions ? <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div> : null}
    </div>
  );
}

