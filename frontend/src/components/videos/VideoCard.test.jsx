import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import VideoCard from './VideoCard';

describe('VideoCard Component', () => {
  const mockVideo = {
    id: 1,
    title: 'Hollow Knight Boss Fight',
    youtube_id: 'dQw4w9WgXcQ',
    author_detail: { id: 1, name: 'GamerPro' },
    video_type: 'guide',
    tags: ['boss', 'no-damage'],
    game: 10,
    game_title: 'Hollow Knight'
  };

  it('renders video metadata (title, author, type, tags, game)', () => {
    render(
      <MemoryRouter>
        <VideoCard video={mockVideo} />
      </MemoryRouter>
    );
    expect(screen.getByText('Hollow Knight Boss Fight')).toBeInTheDocument();
    expect(screen.getByText('Hollow Knight')).toBeInTheDocument();
    expect(screen.getByText('GamerPro')).toBeInTheDocument();
    expect(screen.getByText('guide')).toBeInTheDocument();
    expect(screen.getByText('boss')).toBeInTheDocument();
    expect(screen.getByText('no-damage')).toBeInTheDocument();
  });

  it('renders a YouTube iframe with the correct URL', () => {
    render(
      <MemoryRouter>
        <VideoCard video={mockVideo} />
      </MemoryRouter>
    );
    const iframe = screen.getByTitle('Hollow Knight Boss Fight video player');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed/dQw4w9WgXcQ'));
  });

  it('handles missing game association gracefully', () => {
    const noGameVideo = { ...mockVideo, game: null };
    render(
      <MemoryRouter>
        <VideoCard video={noGameVideo} />
      </MemoryRouter>
    );
    expect(screen.getByText('Hollow Knight Boss Fight')).toBeInTheDocument();
    expect(screen.queryByText('Hollow Knight')).not.toBeInTheDocument();
  });
});
