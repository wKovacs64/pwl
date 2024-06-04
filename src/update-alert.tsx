function UpdateAlert({ siteTitle, onReload, onDismiss }: UpdateAlertProps) {
  return (
    <div className="flex flex-wrap items-center justify-center p-2" aria-live="polite" role="alert">
      <span className="px-2">A new version of {siteTitle} is available!</span>
      <section className="inline-flex w-full justify-around md:w-auto">
        <button className="p-2 uppercase" type="button" onClick={onReload}>
          <span className="border-b">Reload</span>
        </button>
        <button className="p-2 uppercase" type="button" onClick={onDismiss}>
          <span className="border-b">Dismiss</span>
        </button>
      </section>
    </div>
  );
}

interface UpdateAlertProps {
  siteTitle: string;
  onReload: () => void;
  onDismiss: () => void;
}

export default UpdateAlert;
