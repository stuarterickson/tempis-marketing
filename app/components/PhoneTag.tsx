/** The nameplate under a phone in a scene: whose phone it is and what they're doing. */
export default function PhoneTag({ name, role, mark }: { name: string; role: string; mark?: string }) {
  return (
    <div className="phone-tag" aria-hidden>
      <span className="pt-mark">{mark ?? name.slice(0, 1)}</span>
      <span className="pt-text"><b className="display">{name}</b><span>{role}</span></span>
    </div>
  );
}
