import { useState } from 'react';
import CategoryTab from './CategoryTab';

/**
 * CareerCard component to display a career recommendation with an avatar, title, descriptions, and tags.
 * Includes a modal to show detailed information when the card is clicked.
 *
 * @param {Object} props - The component props.
 * @param {string} props.avatar - The URL of the avatar image.
 * @param {string} props.title - The title of the career recommendation.
 * @param {string} props.fullDescription - The full job description.
 * @param {string} props.shortDescription - The short job description.
 * @param {string} props.recommendationReason - The reason why the career is recommended.
 * @param {Array} props.tags - The list of tags associated with the career.
 * @param {Object} props.tagColors - The mapping of tags to their respective colors.
 * @returns {React.ReactNode} The rendered career card component.
 */
const CareerCard = ({
  avatar,
  title,
  fullDescription,
  shortDescription,
  recommendationReason,
  tags = [],
  tagColors = {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Card */}
      <div
        className="career-card bg-gradient-to-b from-blue-50 to-blue-200 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
        onClick={openModal}
      >
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-blue-500 transition-all">
          <img
            src={avatar || "https://api.dicebear.com/9.x/personas/svg"}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-gray-800 group-hover:text-blue-600">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <CategoryTab key={tag} tag={tag} color={tagColors[tag] || 'bg-gray-400'} />
            ))
          ) : (
            <p className="text-sm text-gray-500">No tags available</p>
          )}
        </div>
        {/* Hover animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[90%] md:w-[60%] p-6 relative animate-slide-up"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-md">
                  <img
                    src={avatar || "https://api.dicebear.com/9.x/personas/svg"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{shortDescription}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Job Description</h4>
                <p className="text-sm text-gray-700">{fullDescription}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Why It's Recommended</h4>
                <p className="text-sm text-gray-700">{recommendationReason}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.length > 0 &&
                  tags.map((tag) => (
                    <CategoryTab key={tag} tag={tag} color={tagColors[tag] || 'bg-gray-400'} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CareerCard;
