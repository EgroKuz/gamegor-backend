import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSession, getSessionAdvice } from '../api/sessions';

const RecommendationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionAndAdvice = async () => {
      try {
        setLoading(true);
        // 1. Fetch the base session details
        const sessionData = await getSession(id);
        setSession(sessionData);
        
        // 2. Fetch the AI advice specifically for this session context
        const params = {
          game: sessionData.game,
          tags: sessionData.tags ? sessionData.tags.join(',') : '',
          comment: sessionData.comment || ''
        };
        
        const adviceData = await getSessionAdvice(params);
        setAdvice(adviceData.ai_advice || "No specific advice generated for this session yet.");
        setError(null);
      } catch (err) {
        console.error('Error fetching recommendation details:', err);
        setError('Failed to load recommendation details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndAdvice();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-neon-teal text-xl font-bold animate-pulse">
          Loading Recommendation Details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="text-red-400 text-xl font-bold bg-red-900/20 p-6 rounded-lg border border-red-500/50">
          {error}
        </div>
        <Link to="/profile/sessions" className="text-cyan-400 hover:underline">
          &larr; Back to Sessions
        </Link>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Link to="/profile/sessions" className="inline-flex items-center text-gray-400 hover:text-neon-teal transition-colors">
        <span className="mr-2">&larr;</span> Back to Sessions
      </Link>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-violet/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <header className="border-b border-gray-800 pb-6 mb-6 relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            Recommendation for <span className="text-neon-teal">{session.game_detail}</span>
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {session.tags && session.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
            {(!session.tags || session.tags.length === 0) && (
              <span className="text-gray-500 text-sm italic">No specific tags provided for this session.</span>
            )}
          </div>
        </header>

        <section className="relative z-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span> AI Advisor says:
          </h2>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
            <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
              {advice}
            </p>
          </div>
        </section>

        <div className="mt-8 flex justify-end relative z-10">
          <button 
            onClick={() => navigate(`/videos?gameId=${session.game}`)}
            className="bg-neon-teal text-gray-950 px-8 py-3 rounded-lg font-bold text-lg hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2"
          >
            <span>📺</span> Watch Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetailsPage;
