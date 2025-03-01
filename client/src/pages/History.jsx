import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaSort, FaSearch, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/bg.jpg";

const History = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.games);
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate fetching game history
  useEffect(() => {
    setGameHistory(user?.games);
    setLoading(false);
  }, []);

  // Sorting logic
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedHistory = React.useMemo(() => {
    const sortableItems = [...gameHistory];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [gameHistory, sortConfig]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <div className="max-w-6xl mx-auto">
        {/* <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white mb-6 hover:text-blue-800 hover:bg-white p-2 rounded-xl transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button> */}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Game History</h1>
            <p className="text-gray-500 mt-1">
              View your past Globetrotter games
            </p>
          </div>

          {/* Search and filter */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-sm text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Showing {sortedHistory.length} games
              </div>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading your game history...</p>
            </div>
          ) : (
            <div className="overflow-x-auto hidden md:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("date")}
                    >
                      <div className="flex items-center">
                        Date
                        <FaSort className="ml-1" />
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("correctGuesses")}
                    >
                      <div className="flex items-center">
                        Correct
                        <FaSort className="ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("incorrectGuesses")}
                    >
                      <div className="flex items-center">
                        Incorrect
                        <FaSort className="ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("incorrectGuesses")}
                    >
                      <div className="flex items-center">
                        Skipped
                        <FaSort className="ml-1" />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("accuracy")}
                    >
                      <div className="flex items-center">
                        Accuracy
                        <FaSort className="ml-1" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedHistory.length > 0 ? (
                    sortedHistory.map((game, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(game.date)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {game.correct}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                          {game.incorrect}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                          {game.skipped}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                              <div
                                className={`h-2.5 rounded-full ${
                                  game.accuracy >= 80
                                    ? "bg-green-600"
                                    : game.accuracy >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-600"
                                }`}
                                style={{ width: `${game.accuracy}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {game.accuracy}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No game history found matching your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile view - cards instead of table */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-500">
                    Loading your game history...
                  </p>
                </div>
              ) : sortedHistory.length > 0 ? (
                sortedHistory.map((game) => (
                  <div key={game.id} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Game #{game.id}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(game.date)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-green-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-500">Correct</div>
                        <div className="font-medium text-green-600">
                          {game.correctGuesses}
                        </div>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-center">
                        <div className="text-xs text-gray-500">Incorrect</div>
                        <div className="font-medium text-red-600">
                          {game.incorrectGuesses}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <div className="text-xs text-gray-500 mr-2">
                          Accuracy:
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              game.accuracy >= 80
                                ? "bg-green-600"
                                : game.accuracy >= 50
                                ? "bg-yellow-500"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${game.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">
                          {game.accuracy}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No game history found matching your filter.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
