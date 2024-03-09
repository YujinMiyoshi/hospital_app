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
  
  // 数字データの投稿
  export const createInput = async (number: string) => {
    const body = JSON.stringify({
      number: number,
    });
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  
    // 数字データをAPIに送信
    const result = await fetchAPI("/api/numbers/", options);
  
    if (!result.success) {
      console.error(result.error);
      return { success: false, error: result.error };
    }
  
    // この場合、APIの応答内容によっては、result.data をそのまま返すか、
    // 成功した事実のみを返すか選択します。ここでは成功のみを返します。
    return { success: true };
  };
  