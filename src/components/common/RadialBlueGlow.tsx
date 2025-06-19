export const SpotlightBg = ({
  className = "",
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0  z-0 ${className} overflow-hidden`}>
      <div
        className="w-full h-full mx-auto rounded-full"
        style={{
          background: `
            radial-gradient(
              circle,
              rgba(20, 55, 115, 0.8) 0%,
              var(--fade-end) 60%
            )
          `,
        }}
      />
    </div>
  );
};
