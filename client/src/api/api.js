import axios from "axios";

const url = "http://localhost:5000";
export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${url}/api/users`, user);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getDestination = async () => {
  try {
    const res = await axios.get(`${url}/api/destinations`);
    return res.data;
  } catch (error) {
    console.error("Error fetching destination:", error.message);
    return {
      city: "Paris",
      country: "France",
      clues: [
        "This city is home to a famous tower that sparkles every night.",
        "Known as the 'City of Love' and a hub for fashion and art.",
      ],
      fun_fact: [
        "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
        "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
      ],
      trivia: [
        "This city is famous for its croissants and macarons. Bon appétit!",
        "Paris was originally a Roman city called Lutetia.",
      ],
      options: ["Paris", "Tokyo", "New York", "London"],
    };
  }
};

export const checkAnswer = async (_id, ans) => {
  console.log(_id, ans);
  try {
    const res = await axios.post(`${url}/api/destinations/check-answer`, {
      _id,
      ans,
    });
    return res.data;
  } catch (error) {
    console.error("Error checking answer:", error.message);
    return { success: false, message: "Error checking answer" };
  }
};

export const addGame = async (sub, game) => {
  try {
    const res = await axios.post(`${url}/api/users/add-game`, { sub, game });
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    console.error("Error adding game", error.message);
    return { success: false, message: "Error adding game" };
  }
};
