"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { createInput } from "@/actions/input";

type FormData = {
  number: string;
};

const SimpleNumberForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      number: "",
    },
  });
  const number = watch("number");
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const handleNumberClick = (num: string) => {
    setValue("number", `${number}${num}`);
    setActiveButton(Number(num));
    setTimeout(() => setActiveButton(null), 200);
  };

  const handleDelete = () => {
    setValue("number", number.slice(0, -1)); // 最後の文字を削除
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const res = await createInput(data.number);
      if (res.success) {
        toast.success(`受付番号が送信されました: ${data.number}`, { duration: 3000 });
        reset();
      } else {
        toast.error("送信に失敗しました", { duration: 3000 });
      }
    } catch (error) {
      toast.error("送信に失敗しました", { duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const baseStyle = "text-3xl rounded-lg focus:outline-none focus:shadow-outline block w-24 h-24 transition duration-150 ease-in-out shadow-sm";
  const activeStyle = "bg-gray-300 text-blue-700 shadow-lg";
  const inactiveStyle = "bg-gray-200 text-gray-900 hover:bg-gray-300";
  const deleteButtonStyle = "ml-2 text-xl bg-gray-200 hover:bg-gray-300 p-2 rounded-lg"; // 削除ボタンのスタイル

  return (
    <div className="bg-white">
      <div className="text-2xl font-bold text-center mb-5 text-gray-800">受付番号入力</div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xs m-auto bg-white">
        <div className="flex items-center">
          <input
            id="number"
            type="text"
            {...register("number", { required: true })}
            className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 mb-5 shadow-inner"
            placeholder="数字を入力"
            readOnly
          />
          <button
            type="button"
            onClick={handleDelete}
            className={deleteButtonStyle}
          >
            ⌫
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-center items-center max-w-xs m-auto bg-white">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleNumberClick(num.toString())}
              className={`${baseStyle} ${activeButton === num ? activeStyle : inactiveStyle}`}
            >
              {num}
            </button>
          ))}
          <div className="col-start-2">
            <button
              type="button"
              onClick={() => handleNumberClick("0")}
              className={`${baseStyle} ${activeButton === 0 ? activeStyle : inactiveStyle}`}
            >
              0
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-gray-200 text-gray-800 p-2.5 rounded-lg hover:bg-gray-300 shadow-lg transition duration-150 ease-in-out">
          {isLoading ? "送信中..." : "送信"}
        </button>
      </form>
    </div>
  );
};

export default SimpleNumberForm;