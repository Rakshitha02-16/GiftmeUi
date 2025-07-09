const API_BASE_URL = "https://localhost:7241/api/Like";

export const getLikesByUser = async (userId: number): Promise<number[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch likes");
    const data: number[] = await response.json(); // array of liked post IDs
    return data;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return [];
  }
};

interface LikeRequest {
  postId: number;
  userId: number;
}

export const postLike = async (postId: number, userId: number): Promise<boolean> => {
  try {
    const likeData: LikeRequest = { postId, userId };
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(likeData)
    });

    const result: boolean = await response.json();
    return result;
  } catch (error) {
    console.error("Error liking post:", error);
    return false;
  }
};
