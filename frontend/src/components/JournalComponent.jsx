import { useJournal } from "../hooks/journalHooks/useJournal";
import JournalContainer from "../components/journalComponents/JournalContainer";
import JournalContent from "../components/journalComponents/JournalContent";

const JournalComponent = () => {
  const journalData = useJournal();

  return (

    <JournalContainer>
      <JournalContent {...journalData} />
    </JournalContainer>
  );
};


export default JournalComponent;