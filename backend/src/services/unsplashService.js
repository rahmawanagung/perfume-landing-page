import fetch from "node-fetch";

const accessKey = process.env.UNSPLASH_ACCESS_KEY; // Ambil dari environment variable

async function getImageUrl(query) {
  if (!accessKey) {
    console.error("❌ Unsplash Access Key is not defined.");
    return null;
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=1&orientation=squarish&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    return null;
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    return null;
  }
}

export { getImageUrl };
