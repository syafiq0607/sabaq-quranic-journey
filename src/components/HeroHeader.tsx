import islamicPattern from "@/assets/islamic-pattern.jpg";

const HeroHeader = () => {
  return (
    <header className="relative overflow-hidden">
      <img
        src={islamicPattern}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={600}
      />
      <div className="absolute inset-0 bg-emerald-dark/85" />
      <div className="relative z-10 px-6 py-16 md:py-24 text-center">
        <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">
          ✦ Hafalan Al-Qur'an ✦
        </p>
        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 animate-fade-up">
          Tahfidz <span className="gold-shimmer">Tracker</span>
        </h1>
          <p className="font-body font-semibold font-[Traditional Arabic] text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.15s' }}>
            Kelola Setoran & Muraja'ahmu jadi lebih mudah
          </p>
      </div>
      <div className="relative z-10 flex justify-center gap-8 pb-8">
        {[
          { label: '', value: '' },
          { label: 'Target Hafalan', value: '30 Juz' },
          { label: '', value: '' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="text-center animate-fade-up"
            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
          >
            <p className="font-body  text-primary-foreground/60 text-xl tracking-wider uppercase">{stat.label}</p>
            <p className="font-display text-2xl md:text-3xl text-gold">{stat.value}</p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default HeroHeader;
