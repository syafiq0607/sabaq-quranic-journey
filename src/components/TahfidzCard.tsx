import { useState } from "react";
import { Check, BookOpen, RotateCcw, Archive, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Hafalan {
  id: string;
  surah: string;
  ayat: string;
  tanggal: string;
  status: "belum" | "proses" | "selesai";
}

interface TahfidzCardProps {
  type: "sabaq" | "sabqi" | "manzil";
  items: Hafalan[];
  onAdd: () => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const config = {
  sabaq: {
    title: "Sabaq",
    subtitle: "Hafalan Baru",
    description: "Materi baru yang sedang dihafal hari ini",
    icon: BookOpen,
    gradient: "from-emerald to-emerald-light",
    badge: "bg-emerald/10 text-emerald",
  },
  sabqi: {
    title: "Sabqi",
    subtitle: "Muraja'ah Dekat",
    description: "Review hafalan 1-7 hari terakhir",
    icon: RotateCcw,
    gradient: "from-gold-dark to-gold",
    badge: "bg-gold/10 text-gold-dark",
  },
  manzil: {
    title: "Manzil",
    subtitle: "Muraja'ah Jauh",
    description: "Review hafalan lama untuk penguatan",
    icon: Archive,
    gradient: "from-emerald-dark to-emerald",
    badge: "bg-emerald-dark/10 text-emerald-dark",
  },
};

const TahfidzCard = ({ type, items, onAdd, onToggleStatus,  onDelete }: TahfidzCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const cfg = config[type];
  const Icon = cfg.icon;
  const completed = items.filter((i) => i.status === "selesai").length;
  const progress = items.length > 0 ? (completed / items.length) * 100 : 0;

  return (
    <div className="glass-card rounded-xl overflow-hidden animate-scale-in">
      {/* Header */}
      <div className={`bg-gradient-to-r ${cfg.gradient} p-5`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-xl text-primary-foreground">{cfg.title}</h2>
              <p className="font-body text-primary-foreground/70 text-xs">{cfg.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-primary-foreground/80 text-sm">
              {completed}/{items.length}
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3 h-1.5 rounded-full bg-primary-foreground/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary-foreground/60 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <div className="p-4 space-y-2">
          <p className="font-body text-muted-foreground text-xs mb-3">{cfg.description}</p>
          {items.map((item, i) => (
  <div
    key={item.id}
    className="flex items-center gap-3 p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors group animate-slide-right"
    style={{ animationDelay: `${i * 0.05}s` }}
  >
    {/* ✅ TOGGLE */}
    <button
      onClick={() => onToggleStatus(item.id)}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        item.status === "selesai"
          ? "bg-emerald border-emerald text-primary-foreground"
          : "border-border hover:border-emerald"
      }`}
    >
      {item.status === "selesai" && <Check className="w-3.5 h-3.5" />}
    </button>

    {/* 📖 TEXT */}
    <div className="flex-1 min-w-0">
      <p
        className={`font-body text-sm font-medium ${
          item.status === "selesai"
            ? "line-through text-muted-foreground"
            : "text-foreground"
        }`}
      >
        {item.surah}
      </p>
      <p className="font-body text-xs text-muted-foreground">
        Ayat {item.ayat}
      </p>
    </div>

    {/* 📅 TANGGAL */}
    <span className={`font-body text-xs px-2 py-0.5 rounded-full ${cfg.badge}`}>
      {item.tanggal}
    </span>

    {/* 🔥 TOMBOL DELETE (INI YANG LO CARI) */}
    <button
      onClick={() => {
        if (confirm("Yakin mau hapus hafalan ini?")) {
          onDelete(item.id);
        }
      }}
      className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-700"
    >
      ❌
    </button>
  </div>
))}
          
          {items.length === 0 && (
            <p className="font-body text-muted-foreground text-sm text-center py-6">
              Belum ada hafalan. Tambahkan yang pertama!
            </p>
          )}
          <Button
            onClick={onAdd}
            variant="outline"
            className="w-full mt-2 border-dashed border-border hover:border-emerald hover:text-emerald font-body"
          >
            <Plus className="w-4 h-4 mr-2" /> Tambah Hafalan
          </Button>
          
        </div>
      )}
    </div>
  );
};

export default TahfidzCard;
