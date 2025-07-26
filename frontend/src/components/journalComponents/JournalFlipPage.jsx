import JournalEntry from "./JournalEntry";

const JournalFlipPage = ({ journal, onEdit, onDelete }) => (
  <div className="page relative bg-stone-100 h-full p-4 sm:p-6 rounded-md shadow-md overflow-hidden font-serif flex flex-col">
    <div className="relative z-10 flex-1 overflow-y-auto">
      <JournalEntry journal={journal} onEdit={onEdit} onDelete={onDelete} />
    </div>
  </div>
);

export default JournalFlipPage;
