const URL =
  "http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db";

export async function getQuizData() {
  const APICache = localStorage.getItem("getQuizDataCache");

  if (APICache) {
    const now = new Date();
    const { date, response } = JSON.parse(APICache);
    const max_allowed_cache_date = 10 * 60 * 1000; // 10 minutes, in milliseconds

    if (now - new Date(date) < max_allowed_cache_date) {
      console.log("cache hit");

      return new Promise((resolve) => resolve(response));
    }
  }

  return await fetch(URL)
    .then((res) => res.json())
    .then((response) => {
      localStorage.setItem(
        "getQuizDataCache",
        JSON.stringify({ date: new Date(), response })
      );

      return response;
    });
}
