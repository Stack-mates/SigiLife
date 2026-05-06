export default function SigilThumb({
  sigilData,
  onClick,
  isCharged
}: {
  sigilData: any,
  onClick?: () => void,
  isCharged?: boolean
}) {
  return (
    <div className={`sigilthumb ${isCharged ? 'charged' : ''}`} onClick={onClick}>
      <p style={{
        fontSize: "clamp(13px, 2vw, 22px)",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        textAlign: "center"
      }}>
        {sigilData.name.length > 6 ? sigilData.name.slice(0, 6) + "..." : sigilData.name}
      </p>

      {sigilData.imageData ? (
        <img
          src={sigilData.imageData}
          alt={sigilData.name}

        />
      ) : (
        <p>{sigilData.img}</p>
      )}

      <p>{sigilData.sigilGroups?.map((g: any) => g.groupMember.join(','))}</p>
    </div>
  )
}