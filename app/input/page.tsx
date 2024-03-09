import InputNew from "@/components/input/InputNew"
import { Toaster } from 'react-hot-toast';

//新規入力ページ
const InputNewPage = async () => {
    return (
      <div>
        <Toaster />
        <InputNew />
      </div>        
    );
}

export default InputNewPage