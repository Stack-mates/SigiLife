import SigilThumb from "./SigilThumb"

export default function SigiLibrary({ items }: { items: any[]}) {
  if (!items){
    return (
      <p>loading...</p>
    )
  }

  return (
    <div className="sigilibrary">
      {items.map((sigil:any) => (
        <SigilThumb
        key={sigil.name}
        sigilData={sigil} />
      ))}
    </div>
  );
};