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
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-4 animate-fade-up">
          Tahfidz <span className="gold-shimmer">Tracker</span>
        </h1>
        <p className="font-body text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.15s' }}>
          Kelola hafalan Sabaq, Sabqi & Manzil dengan mudah dan terstruktur
        </p>
      </div>
      <div className="relative z-10 flex justify-center gap-8 pb-8">
        {[
          { label: 'Total Hafalan', value: '15 Juz' },
          { label: 'Hari Aktif', value: '120' },
          { label: 'Target', value: '30 Juz' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="text-center animate-fade-up"
            style={{ animationDelay: `${0.3 + i * 0.1}s` }}
          >
            <p className="font-display text-2xl md:text-3xl text-gold">{stat.value}</p>
            <p className="font-body text-primary-foreground/60 text-xs tracking-wider uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default HeroHeader;
