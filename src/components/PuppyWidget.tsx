import puppy from "@/assets/puppy.png";

const PuppyWidget = () => {
  const handleClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <button
      onClick={handleClick}
      aria-label="Jump to Contact"
      className="fixed top-4 right-4 z-[60] w-16 h-16 md:w-20 md:h-20 rounded-full bg-card/70 backdrop-blur-md border border-border shadow-lg overflow-visible flex items-center justify-center hover:scale-110 transition-transform group"
    >
      <img
        src={puppy}
        alt="Cute puppy — click to contact"
        width={80}
        height={80}
        className="puppy-bob w-full h-full object-contain drop-shadow-md"
      />
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-body opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        Say hi! →
      </span>
    </button>
  );
};

export default PuppyWidget;
