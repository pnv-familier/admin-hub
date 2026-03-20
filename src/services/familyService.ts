const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export interface FamilyItem {
  familyId: string;
  familyName: string;
  ownerEmail: string;
  memberCount: number;
  createdAt: string;
  status: string;
}

export interface FamilyPage {
  content: FamilyItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export async function getFamilies(
  token: string,
  keyword = "",
  page = 0,
  size = 10
): Promise<FamilyPage> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (keyword) params.set("keyword", keyword);
  const res = await fetch(`${API_BASE}/api/v1/admin/families?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch families");
  const json = await res.json();
  const springPage = json.data;
  return {
    content: springPage.content,
    totalElements: springPage.totalElements,
    totalPages: springPage.totalPages,
    number: springPage.number,
    size: springPage.size,
  };
}

export async function createFamily(
  token: string,
  payload: { familyName: string; ownerEmail: string }
): Promise<FamilyItem> {
  const res = await fetch(`${API_BASE}/api/v1/admin/families`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? "Failed to create family");
  }
  const json = await res.json();
  return json.data;
}
