import { useNavigate } from 'react-router-dom';

interface UseShowPageNavigatorResult {
  handleNavigate: () => void;
}

export const useShowPageNavigator = (id: number): UseShowPageNavigatorResult => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/show/${id}`);
  };

  return {
    handleNavigate,
  };
};
