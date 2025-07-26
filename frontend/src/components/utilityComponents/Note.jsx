import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Smile,
  Meh,
  Frown,
  Sun,
  Cloud,
} from "lucide-react";

const MOODS = [
  { id: "great", icon: Sun, label: "Great", color: "text-yellow-600" },
  { id: "good", icon: Smile, label: "Good", color: "text-green-500" },
  { id: "okay", icon: Meh, label: "Okay", color: "text-blue-500" },
  { id: "down", icon: Cloud, label: "Down", color: "text-gray-500" },
  { id: "bad", icon: Frown, label: "Bad", color: "text-red-500" },
];

const STORAGE_KEY = "moodTracker";
const NOTE_KEY = "note";

const Note = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todayMood, setTodayMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      setMoodHistory(data.history || []);
      const today = new Date().toDateString();
      const todayEntry = data.history?.find((e) => e.date === today);
      if (todayEntry) setTodayMood(todayEntry.mood);
    }
    const storedNote = localStorage.getItem(NOTE_KEY);
    if (storedNote) setNote(storedNote);
  }, []);

  const handleSaveMood = (moodId) => {
    const today = new Date().toDateString();
    const updatedHistory = [
      ...moodHistory.filter((e) => e.date !== today),
      { date: today, mood: moodId },
    ];
    setTodayMood(moodId);
    setMoodHistory(updatedHistory);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ history: updatedHistory })
    );
  };

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNote(value);
    localStorage.setItem(NOTE_KEY, value);
  };

  const recentMoods = [...moodHistory].slice(-7).reverse();

  return (
    <div
      className={`fixed top-15 left-0  z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-[90%]"
      }`}
    >
      <div className="relative bg-white/60 backdrop-blur-md border border-darkblue rounded-2xl shadow-lg w-64 min-h-screen">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Mood Tracker"
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white/80 border border-gray-200 rounded-full p-1 shadow-md"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        <div className="p-4">
          <header className="flex items-center gap-2 mb-4">
            <h3 className="font-bold text-black font-jakarta">Mood Tracker</h3>
          </header>

          <section className="mb-4">
            <p className="text-sm text-gray-900 mb-2">
              How are you feeling today?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {MOODS.map(({ id, icon: Icon, label, color }) => {
                const selected = todayMood === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleSaveMood(id)}
                    className={`p-2 rounded-lg border transition ${
                      selected
                        ? "border-darkblue bg-teal-100"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
                    <span className="text-xs text-gray-700">{label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">My Note</h4>
            <textarea
              value={note}
              onChange={handleNoteChange}
              placeholder="Note to self..."
              className="w-full max-h-32 min-h-20 p-2 border italic border-gray-300 rounded-xl resize-none bg-white/90 text-sm text-gray-800 focus:ring-2 focus:ring-green-300 outline-none shadow-sm overflow-auto"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #f0fdf4, #f0fdf4 23px, #e9f8ef 24px, #f0fdf4 25px)",
                backgroundAttachment: "local",
                lineHeight: "25px",
                fontFamily: "inherit",
              }}
            />
          </section>

          {recentMoods.length > 0 && (
            <section>
              <p className="text-sm text-gray-600 mb-2">Recent days:</p>
              <ul className="space-y-2">
                {recentMoods.slice(0, 5).map(({ date, mood }, i) => {
                  const moodObj = MOODS.find((m) => m.id === mood);
                  const Icon = moodObj?.icon;
                  return (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      {Icon && <Icon className={`w-3 h-3 ${moodObj.color}`} />}
                      <span className="text-gray-500">
                        {new Date(date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-700">
                        {moodObj?.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
