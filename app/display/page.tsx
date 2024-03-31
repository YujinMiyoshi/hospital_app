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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'gray', marginBottom: '0.5rem' }}>受付番号</h2>
        <h1 style={{ fontSize: '25rem', fontWeight: 'bold', color: 'brack' }}>{number}</h1>
      </div>
      <h3 style={{ fontSize: '2rem', color: 'gray' }}>診察室へお越しください</h3>
    </div>
  );
  
};

export default Display;