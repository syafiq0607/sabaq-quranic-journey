import { useState } from "react";
import HeroHeader from "@/components/HeroHeader";
import TahfidzCard from "@/components/TahfidzCard";
import AddHafalanDialog from "@/components/AddHafalanDialog";
import ProgressRing from "@/components/ProgressRing";
import { BookOpen, RotateCcw, Archive } from "lucide-react";

interface Hafalan {
  id: string;
  surah: string;
  ayat: string;
  tanggal: string;
  status: "belum" | "proses" | "selesai";
}

const initialSabaq: Hafalan[] = [
  { id: "s1", surah: "Al-Baqarah", ayat: "1-5", tanggal: "Hari ini", status: "selesai" },
  { id: "s2", surah: "Al-Baqarah", ayat: "6-10", tanggal: "Hari ini", status: "proses" },
  { id: "s3", surah: "Al-Baqarah", ayat: "11-16", tanggal: "Hari ini", status: "belum" },
];

const initialSabqi: Hafalan[] = [
  { id: "q1", surah: "Al-Fatihah", ayat: "1-7", tanggal: "Kemarin", status: "selesai" },
  { id: "q2", surah: "Al-Baqarah", ayat: "1-5", tanggal: "2 hari lalu", status: "belum" },
];

const initialManzil: Hafalan[] = [
  { id: "m1", surah: "Al-Fatihah", ayat: "1-7", tanggal: "1 minggu lalu", status: "selesai" },
  { id: "m2", surah: "An-Nas", ayat: "1-6", tanggal: "2 minggu lalu", status: "belum" },
  { id: "m3", surah: "Al-Falaq", ayat: "1-5", tanggal: "2 minggu lalu", status: "selesai" },
];

const deleteItem = (
  list: Hafalan[],
  setList: React.Dispatch<React.SetStateAction<Hafalan[]>>,
  id: string
) => {
  setList(list.filter((item) => item.id !== id));
};

const Index = () => {
  const [sabaq, setSabaq] = useState<Hafalan[]>(initialSabaq);
  const [sabqi, setSabqi] = useState<Hafalan[]>(initialSabqi);
  const [manzil, setManzil] = useState<Hafalan[]>(initialManzil);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"sabaq" | "sabqi" | "manzil">("sabaq");

  const toggleStatus = (
    list: Hafalan[],
    setList: React.Dispatch<React.SetStateAction<Hafalan[]>>,
    id: string
  ) => {
    setList(
      list.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "selesai" ? "belum" : "selesai" }
          : item
      )
    );
  };

  const handleAdd = (data: { surah: string; ayat: string; type: string }) => {
    const now = new Date();
    const tanggal = now.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    const newItem: Hafalan = {
      id: crypto.randomUUID(),
      surah: data.surah,
      ayat: data.ayat,
      tanggal,
      status: "belum",
    };
    if (data.type === "sabaq") setSabaq((prev) => [...prev, newItem]);
    if (data.type === "sabqi") setSabqi((prev) => [...prev, newItem]);
    if (data.type === "manzil") setManzil((prev) => [...prev, newItem]);
  };

  const openDialog = (type: "sabaq" | "sabqi" | "manzil") => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const getProgress = (list: Hafalan[]) =>
    list.length > 0 ? (list.filter((i) => i.status === "selesai").length / list.length) * 100 : 0;

  const totalItems = sabaq.length + sabqi.length + manzil.length;
  const totalDone = [...sabaq, ...sabqi, ...manzil].filter((i) => i.status === "selesai").length;

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />

      {/* Progress Section */}
      <section className="max-w-5xl mx-auto px-6 -mt-4 relative z-20">
        <div className="glass-card rounded-2xl p-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <ProgressRing
              progress={getProgress(sabaq)}
              label="Sabaq"
              sublabel="Hafalan Baru"
            />
            <ProgressRing
              progress={getProgress(sabqi)}
              label="Sabqi"
              sublabel="Muraja'ah Dekat"
            />
            <ProgressRing
              progress={getProgress(manzil)}
              label="Manzil"
              sublabel="Muraja'ah Jauh"
            />
            <ProgressRing
              progress={totalItems > 0 ? (totalDone / totalItems) * 100 : 0}
              size={140}
              label="Total"
              sublabel={`${totalDone}/${totalItems} selesai`}
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-5xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: BookOpen, label: "Sabaq", count: sabaq.length, color: "text-emerald" },
            { icon: RotateCcw, label: "Sabqi", count: sabqi.length, color: "text-gold-dark" },
            { icon: Archive, label: "Manzil", count: manzil.length, color: "text-emerald-dark" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <p className="font-display text-xl text-foreground">{stat.count}</p>
              <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <TahfidzCard
          type="sabaq"
          items={sabaq}
          onAdd={() => openDialog("sabaq")}
          onToggleStatus={(id) => toggleStatus(sabaq, setSabaq, id)}
          onDelete={(id) => deleteItem(sabaq, setSabaq, id)}
        />
        <TahfidzCard
          type="sabqi"
          items={sabqi}
          onAdd={() => openDialog("sabqi")}
          onToggleStatus={(id) => toggleStatus(sabqi, setSabqi, id)}
          onDelete={(id) => deleteItem(sabaq, setSabaq, id)}
        />
        <TahfidzCard
          type="manzil"
          items={manzil}
          onAdd={() => openDialog("manzil")}
          onToggleStatus={(id) => toggleStatus(manzil, setManzil, id)}
          onDelete={(id) => deleteItem(sabaq, setSabaq, id)}
        />
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="font-display text-lg text-foreground">يَسَّرَ اللهُ لَنَا الْأُمُورَ</p>
        <p className="font-body text-xs text-muted-foreground mt-2">
          Tahfidz Tracker ©2026
        </p>
      </footer>

      <AddHafalanDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={handleAdd}
        type={dialogType}
      />
    </div>
  );
};

export default Index;
