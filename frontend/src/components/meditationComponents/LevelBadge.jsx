const levelStyles = {
  beginner: {
    label: "Beginner",
    color: "bg-green-300 text-black",
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-yellow-300 text-black",
  },
  advanced: {
    label: "Advanced",
    color: "bg-blue-300 text-black",
  },
  expert: {
    label: "Expert",
    color: "bg-red-300 text-black",
  },
};

const LevelBadge = ({ level }) => {
  const style = levelStyles[level] || {
    label: level.charAt(0).toUpperCase() + level.slice(1),
    color: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.color}`}
      data-aos="scale-in"
      data-aos-delay="500"
    >
      <span>Level: {style.label}</span>
    </span>
  );
};

export default LevelBadge;
