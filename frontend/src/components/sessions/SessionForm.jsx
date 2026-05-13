import React, { useState } from 'react';

const SessionForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onSubmit({
      rating,
      comment,
      tags
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-300">Rating (1-10)</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-300">Comment/Review</label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="e.g., hard boss, great story"
          className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-teal"
        />
      </div>

      <div className="flex gap-4 pt-4 border-t border-gray-800">
        <button
          type="submit"
          className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SessionForm;
