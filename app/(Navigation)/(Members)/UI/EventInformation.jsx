export function EventInformation({ title, date, time, description, location, onClose }) {
  return (
    <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
        onClick={onClose}
    >
        <div
           className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative"
           onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >

        {/* CLOSE BUTTON */}
        <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Description:</strong> {description}</p>
      </div>
    </div>
  );
}