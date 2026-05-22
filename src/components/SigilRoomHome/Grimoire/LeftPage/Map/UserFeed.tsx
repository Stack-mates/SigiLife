import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

type Activity = {
  id: number;
  type: string;
  message: string;
  isNarrative: boolean;
  dismissed: boolean;
  createdAt: string;
  fromUserId?: number;
};

const NARRATIVE_IDS = [4, 9, 16];

const NARRATIVE_COLORS: Record<number, string> = {
  4: '#2dd4bf',
  9: '#c4b5fd',
  16: '#1e3a5f',
};

const NARRATIVE_EMOJIS: Record<number, string> = {
  4: '🌿',
  9: '🔮',
  16: '⚓',
};

const TYPE_EMOJI: Record<string, string> = {
  group_added: '✦',
  sigil_voted: '⚡',
  friend_map_sigil: '📍',
  new_follower: '👁',
  sigilites: '✧',
  narrative: '📜',
};

export default function UserFeed() {
  const { user } = useUser();
  const [gameUpdates, setGameUpdates] = useState<Activity[]>([]);
  const [feedEvents, setFeedEvents] = useState<Activity[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/users/${user.id}/activities`)
      .then(res => res.json())
      .then(data => {
        setGameUpdates(data.gameUpdates ?? []);
        setFeedEvents(data.feedEvents ?? []);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [user?.id]);

  const handleDismiss = async (id: number) => {
    await fetch(`/api/users/${id}/activity-dismiss`, { method: 'PATCH' });
    setGameUpdates(prev => prev.filter(a => a.id !== id));
  };

  if (!user) return null;

  const allItems = [
    ...gameUpdates.map(a => ({ ...a, isGameUpdate: true })),
    ...feedEvents.map(a => ({ ...a, isGameUpdate: false })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (allItems.length === 0) return (
    <div className='glasscard' style={{
      width: '88dvw',
      height: '30dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      border: '2px solid var(--theme-btn)',
      zIndex: 2,
    }}>
      <p style={{ opacity: 0.5, fontFamily: 'Special Elite, system-ui' }}>No activity yet.</p>
    </div>
  );

  return (
    <div className='glasscard' style={{
      width: '88dvw',
      height: '30dvh',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '12px',
      border: '2px solid var(--theme-btn)',
      zIndex: 2,
      overflowY: 'auto',
      padding: '0.75rem 1rem',
      gap: '0.5rem',
    }}>
      <h4> Recent Map Activity </h4>
      {allItems.map(item => (
        <div key={item.id} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.4rem 0.6rem',
          borderRadius: '8px',
          background: item.isNarrative
            ? 'rgba(255,255,255,0.05)'
            : 'transparent',
          borderLeft: item.isNarrative
            ? '3px solid var(--theme-btn)'
            : '3px solid transparent',
        }}>
          <span style={{
            fontFamily: 'Special Elite, system-ui',
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: item.fromUserId && NARRATIVE_IDS.includes(item.fromUserId)
              ? NARRATIVE_COLORS[item.fromUserId]
              : item.isNarrative
                ? 'var(--theme-btn)'
                : 'var(--theme-text)',
          }}>
            {item.fromUserId && NARRATIVE_IDS.includes(item.fromUserId)
              ? NARRATIVE_EMOJIS[item.fromUserId]
              : TYPE_EMOJI[item.type] ?? '✦'
            } {item.message}
          </span>
          {item.isGameUpdate && (
            <button
              onClick={() => handleDismiss(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--theme-text)',
                opacity: 0.5,
                cursor: 'pointer',
                fontSize: '0.75rem',
                flexShrink: 0,
                marginLeft: '0.5rem',
              }}
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}