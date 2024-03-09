"use server"

// 共通のAPIリクエスト関数
const fetchAPI = async (url: string, options: RequestInit) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return { success: false, error: "API URLが設定されていません" };
    }
  
    try {
      const response = await fetch(`${apiUrl}${url}`, options);
  
      if (!response.ok) {
        return { success: false, error: "APIでエラーが発生しました" };
      }
  
      // Content-Type ヘッダーが application/json の場合のみ、JSON を解析する
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        return { success: true, data };
      }
  
      // データなしで成功を返す
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "ネットワークエラーが発生しました" };
    }
  };

  export const getNumbers = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    // APIから数字の一覧を取得
    const result = await fetchAPI("/api/numbers/", options);
  
    if (!result.success) {
      console.error(result.error);
      return { success: false, error: result.error };
    }
  
    // 成功した場合は取得したデータを返す
    return { success: true, data: result.data };
  };