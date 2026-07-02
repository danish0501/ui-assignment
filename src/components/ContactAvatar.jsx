export default function ContactAvatar({ contact, size = 36 }) {
  const letter = contact.name.charAt(0);

  if (contact.image) {
    return (
      <img
        src={contact.image}
        alt={contact.name}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
      style={{ width: size, height: size, background: contact.color, fontSize: size * 0.38 }}
    >
      {letter}
    </div>
  );
}
