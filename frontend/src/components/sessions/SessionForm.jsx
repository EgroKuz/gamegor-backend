import React, { useState, useEffect } from 'react';

const SessionForm = ({ initialData = null, onSubmit, onCancel, isSubmitting = false, error = null }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialData) {
      setRating(initialData.rating ? initialData.rating.toString() : '');
      setComment(initialData.comment || '');
      setTagsInput(Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!rating) {
      setValidationError('Rating is required (1-10)');
      return;
    }
    
    setValidationError('');

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onSubmit({
      rating: parseInt(rating, 10),
      comment,
      tags
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {validationError && (
        <div className="bg-yellow-900/30 border border-yellow-500/50 text-yellow-400 p-3 rounded-lg text-sm">
          {validationError}
        </div>
      )}

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-300">Rating (1-10) *</label>
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
          disabled={isSubmitting}
          className="bg-neon-teal text-gray-950 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors border border-gray-700 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SessionForm;

