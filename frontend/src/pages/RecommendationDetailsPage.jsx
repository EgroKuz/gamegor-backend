import React from 'react';
import { useParams } from 'react-router-dom';

const RecommendationDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-neon-teal text-xl font-bold">
        Recommendation Details for Session {id}
      </div>
    </div>
  );
};

export default RecommendationDetailsPage;
