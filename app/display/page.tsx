"use client";
import React, { useEffect, useState } from 'react';
import { getNumbers } from "@/actions/display"; // APIから受付番号の一覧を取得する関数

// トップページ
const Display = () => {
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState(false);

  // 受付番号の一覧をAPIから取得する関数
  const fetchNumbers = async () => {
    const { success, data } = await getNumbers();
    if (success) {
      setNumbers(data);
      setError(false);
    } else {
      setError(true);
    }
  };

  // コンポーネントがマウントされたときと、1秒ごとに受付番号の一覧を更新
  useEffect(() => {
    fetchNumbers();
    const intervalId = setInterval(fetchNumbers, 5000);

    // コンポーネントがアンマウントされたときにインターバルをクリア
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    return <div className="text-center text-sm text-gray-500">受付番号の取得に失敗しました</div>;
  }

  if (numbers.length === 0) {
    return <div className="text-center text-sm text-gray-500">受付番号がありません</div>;
  }

  // 最後尾の10個の受付番号を取得
  const lastTenNumbers = numbers.slice(-10);

  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">受付番号が表示された方はお入りください。</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {lastTenNumbers.map((number, index) => (
          <div key={index} className="p-4 shadow-lg rounded-lg bg-white">
            <p className="text-lg font-medium text-gray-700">{number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
