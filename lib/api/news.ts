import { apiResponse } from "../interface";

interface GetAllNewsParams {
  page?: number;
  categorySlug?: string;
  examSlug?: string;
}

interface GetSuggestedNewsParams {
  categoryId?: number;
  examId?: number;
  excludeId: number;
  limit?: number;
}

export async function getAllNews({
  page = 1,
  categorySlug,
  examSlug,
}: GetAllNewsParams) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/AnonymousStoredProcedure/execute/sp_Anonymous/1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Still keep it SSR-safe
        body: JSON.stringify({
          page,
          ...(categorySlug && { categorySlug }),
          ...(examSlug && { examSlug }),
        }),
      }
    );

    const data: apiResponse = await res.json();

    if (!data.isSuccess) {
      return { news: [], total: 0, page: 0, pageSize: 0 };
    }
    return data.result[0];
  } catch (error) {
    return { news: [], total: 0, page: 0, pageSize: 0 };
  }
}

export async function getCategoryAndExamList() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/AnonymousStoredProcedure/execute/sp_Anonymous/2`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const data: apiResponse = await res.json();

    if (!data.isSuccess) {
      return { NewsCategoryList: [], ExamList: [] };
    }
    return data.result[0];
  } catch (error) {
    return { NewsCategoryList: [], ExamList: [] };
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/AnonymousStoredProcedure/execute/sp_Anonymous/3`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ slug: slug }),
      }
    );

    const data: apiResponse = await res.json();

    if (!data.isSuccess || !data.result?.[0]) return null;

    return data.result[0];
  } catch (error) {
    return null;
  }
}

export async function getSuggestedNews({
  categoryId,
  examId,
  excludeId,
  limit = 5,
}: GetSuggestedNewsParams) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/AnonymousStoredProcedure/execute/sp_Anonymous/4`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          categoryId,
          examId,
          excludeId,
          limit,
        }),
      }
    );

    const data: apiResponse = await res.json();

    if (!data.isSuccess || !data.result?.length) return [];

    return data.result;
  } catch (error) {
    return [];
  }
}
