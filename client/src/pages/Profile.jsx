import {
  FaEnvelope,
  FaCalendarAlt,
  FaTrophy,
  FaMapMarkedAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/bg.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Sample stats - in a real app, these would come from your backend
  const matches = JSON.parse(localStorage.getItem("user")).games;
  const stats = {
    gamesPlayed: matches.length,
    countriesVisited: matches.length,
    bestScore: matches.reduce(
      (max, match) => (match.accuracy > max ? match.accuracy : max),
      0
    ),
    memberSince: new Date(user?.created_at || Date.now()).toLocaleDateString(),
  };

  return (
    <div
      className="min-h-screen bg-gray-100 pt-20 pb-6 px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button> */}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header with background */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32 sm:h-48 flex items-center justify-center">
            <img
              src={user?.picture || "/placeholder.svg?height=128&width=128"}
              alt="Profile"
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>

          <div className="relative px-4 sm:px-6 pb-8">
            {/* Profile picture */}

            {/* User info */}
            <div className="mt-16 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.name || "User Name"}
              </h1>
              <p className="text-gray-500 flex items-center justify-center mt-1">
                <FaEnvelope className="mr-2" />
                {user?.email || "user@example.com"}
              </p>
              <p className="text-gray-500 flex items-center justify-center mt-1">
                <FaCalendarAlt className="mr-2" />
                Member since {stats.memberSince}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-blue-600 text-3xl font-bold">
                  {stats.gamesPlayed}
                </div>
                <div className="text-gray-600">Games Played</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-green-600 text-3xl font-bold">
                  {stats.countriesVisited}
                </div>
                <div className="text-gray-600">Countries Visited</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-purple-600 text-3xl font-bold">
                  {stats.bestScore}%
                </div>
                <div className="text-gray-600">Best Accuracy</div>
              </div>
            </div>

            {/* Recent achievements */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Achievements
              </h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <FaTrophy className="text-yellow-500 h-6 w-6 mr-3" />
                  <div>
                    <div className="font-medium">World Explorer</div>
                    <div className="text-sm text-gray-500">
                      Visited {stats.gamesPlayed}+ countries
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <FaMapMarkedAlt className="text-blue-500 h-6 w-6 mr-3" />
                  <div>
                    <div className="font-medium">Geography Expert</div>
                    <div className="text-sm text-gray-500">
                      {stats.bestScore}% accuracy in Europe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
