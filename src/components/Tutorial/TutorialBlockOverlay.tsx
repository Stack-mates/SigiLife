interface TutorialBlockOverlayProps {
  visible: boolean;
}

export default function TutorialBlockOverlay({ visible }: TutorialBlockOverlayProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8400,
        background: 'rgba(5, 0, 15, 0.82)',
        backdropFilter: 'blur(2px)',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 600ms ease',
      }}>

    </div>
  )
}