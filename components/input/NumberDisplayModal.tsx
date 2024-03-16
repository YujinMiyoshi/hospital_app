"use client";
import React, { useState, useEffect } from 'react';
import { getNumbers } from "@/actions/display";
import { deleteNumber } from "@/actions/input";
import toast from "react-hot-toast";

interface NumberDisplayModalProps {
  onClose: () => void;
}

const NumberDisplayModal: React.FC<NumberDisplayModalProps> = ({ onClose }) => {
  const [number, setNumber] = useState<string | null>(null); // 初期状態をnullに変更
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchNumber = async () => {
      const { success, data } = await getNumbers();
      if (success) {
        setNumber(data);
        setError(false);
      } else {
        setError(true);
      }
    };
    fetchNumber();
  }, []);

  const handleDelete = async () => {
    if (!number) { // numberがnullまたは空文字の場合
      toast.error("削除する番号はありません", { duration: 3000 });
      return;
    }
  
    const { success } = await deleteNumber();
    if (success) {
      toast.success("番号を削除しました", { duration: 3000 });
      onClose();
      setNumber(null); // 削除後はnumberをnullに設定しておく
    } else {
      toast.error("番号削除に失敗しました", { duration: 3000 });
    }
  };  

  return (
    <div className="modal-background" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div className="modal" style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '500px', width: '100%' }}>
        {error ? (
          <p>番号の取得に失敗しました。</p>
        ) : number ? ( // 条件分岐を追加して、numberがnullまたは空文字の場合の表示を変更
          <p style={{ fontSize: '24px' }}>{number}</p> // 番号表示のフォントサイズを大きくする
        ) : (
          <p>表示中の番号はありません。</p> // nullまたは空文字の場合のメッセージ
        )}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button onClick={handleDelete} style={{ marginRight: '10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}>削除</button>
          <button onClick={onClose} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#388e3c'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}>閉じる</button>
        </div>
      </div>
    </div>
  );
};

export default NumberDisplayModal;