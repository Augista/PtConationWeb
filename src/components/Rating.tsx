import { Star } from 'lucide-react';

const renderRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const maxStars = 5;

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} fill="currentColor" stroke="none" />
      ))}
      {halfStar && <Star fill="currentColor" stroke="none" className="opacity-50" />}
      {[...Array(maxStars - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
        <Star key={index + fullStars + 1} stroke="currentColor" />
      ))}
    </div>
  );
};

export default renderRating;