export interface Devotional {
  id?: string; // This will be the date string YYYY-MM-DD
  title: string;
  date: string;
  memoryVerse: {
    verse: string;
    text: string;
  };
  bibleText: {
    verse: string;
    text: string;
  };
  message: string;
  conclusion: string;
  createdAt?: any;
}

/**
 * Fetch a devotional for a specific date (YYYY-MM-DD)
 */
export async function getDevotionalByDate(
  dateStr: string,
): Promise<Devotional | null> {
  try {
    const res = await fetch(`/api/devotional?date=${dateStr}`);
    if (res.ok) return await res.json();
    return null;
  } catch (err) {
    console.error("Error fetching devotional:", err);
    return null;
  }
}

/**
 * Fetch a list of recent devotionals for the archive
 */
export async function getRecentDevotionals(limit = 30): Promise<Devotional[]> {
  try {
    const res = await fetch(`/api/devotional?limit=${limit}`);
    if (res.ok) return await res.json();
    return [];
  } catch (err) {
    console.error("Error fetching recent devotionals:", err);
    return [];
  }
}

/**
 * Save or update a devotional (Admin only)
 */
export async function saveDevotional(
  devotional: Devotional,
  authToken: string,
) {
  const res = await fetch("/api/admin/devotional", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(devotional),
  });
  return await res.json();
}

/**
 * Delete a devotional (Admin only)
 */
export async function deleteDevotional(dateStr: string, authToken: string) {
  const res = await fetch(`/api/admin/devotional?id=${dateStr}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return await res.json();
}
