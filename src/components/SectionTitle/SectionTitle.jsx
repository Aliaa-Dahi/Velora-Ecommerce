const SectionTitle = ({ title }) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="flex items-center gap-3">
        <span className="w-1 h-7 bg-primary rounded-full block shrink-0"></span>
        <h2 className="text-text-heading text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="mt-3 h-px bg-neutral-border w-full"></div>
    </div>
  );
};

export default SectionTitle;
