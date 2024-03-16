"use client";
import React, { useEffect, useState } from 'react';
import { getNumbers } from "@/actions/display";

const Display = () => {
  const [number, setNumber] = useState(null);
  const [error, setError] = useState(false);

  const fetchNumber = async () => {
    const { success, data } = await getNumbers();
    if (success) {
      setNumber(data);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    fetchNumber();
    const intervalId = setInterval(fetchNumber, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'gray' }}> {/* フォントサイズを調整 */}
          受付番号の取得に失敗しました。
        </h1>
      </div>
    );  }

  if (number === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'gray' }}> {/* フォントサイズを調整 */}
          受付番号がありません。
        </h1>
      </div>
    );
  }

  // 中央配置と大きなフォントサイズで表示
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'gray' }}> {/* フォントサイズを調整 */}
        {number}番の方お入りください。
      </h1>
    </div>
  );
};

export default Display;