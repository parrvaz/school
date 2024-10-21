import ReturnButton from '../returnButton';
import { faNumber } from 'app/utils/common.util';
import fa from 'app/lib/fa.json';

const ForbiddenPage: React.FC = () => {
  return (
    <div className="bg-berry05 h-screen isCenter">
      <div className="bg-white p-10 text-center border border-berry10 rounded-lg">
        <div className="text-48 font-bold text-berry100">{faNumber(403)}</div>
        <div className="font-light text-20 mt-4">{fa.global.notAccess}</div>
        <ReturnButton />
      </div>
    </div>
  );
};

export default ForbiddenPage;
