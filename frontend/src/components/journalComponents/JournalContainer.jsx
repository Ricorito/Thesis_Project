
const JournalContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-100 flex justify-center items-center">
      <div className="relative w-full max-w-5xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default JournalContainer;

