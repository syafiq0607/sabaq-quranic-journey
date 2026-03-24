import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddHafalanDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { surah: string; ayat: string; type: string }) => void;
  type: "sabaq" | "sabqi" | "manzil";
}

const surahList = [
  "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah",
  "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Taubah", "Yunus",
  "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr",
  "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Taha",
  "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan",
  "Asy-Syu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum",
  "Luqman", "As-Sajdah", "Al-Ahzab", "Saba'", "Fatir",
  "Ya Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir",
  "Fussilat", "Asy-Syura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jasiyah",
  "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
  "Az-Zariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman",
  "Al-Waqi'ah", "Al-Hadid", "Al-Mujadilah", "Al-Hasyr", "Al-Mumtahanah",
  "As-Saff", "Al-Jumu'ah", "Al-Munafiqun", "At-Tagabun", "At-Talaq",
  "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij",
  "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddassir", "Al-Qiyamah",
  "Al-Insan", "Al-Mursalat", "An-Naba'", "An-Nazi'at", "'Abasa",
  "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Insyiqaq", "Al-Buruj",
  "At-Tariq", "Al-A'la", "Al-Gasyiyah", "Al-Fajr", "Al-Balad",
  "Asy-Syams", "Al-Lail", "Ad-Duha", "Asy-Syarh", "At-Tin",
  "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat",
  "Al-Qari'ah", "At-Takasur", "Al-'Asr", "Al-Humazah", "Al-Fil",
  "Quraisy", "Al-Ma'un", "Al-Kausar", "Al-Kafirun", "An-Nasr",
  "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas",
];

const AddHafalanDialog = ({ open, onClose, onAdd, type }: AddHafalanDialogProps) => {
  const [surah, setSurah] = useState("");
  const [ayat, setAyat] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surah || !ayat) return;
    onAdd({ surah, ayat, type });
    setSurah("");
    setAyat("");
    onClose();
  };

  const typeLabel = type === "sabaq" ? "Sabaq" : type === "sabqi" ? "Sabqi" : "Manzil";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="font-body bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">
            Tambah {typeLabel}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label className="text-foreground">Surah</Label>
            <Select value={surah} onValueChange={setSurah}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Pilih Surah" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {surahList.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Ayat</Label>
            <Input
              placeholder="Contoh: 1-10"
              value={ayat}
              onChange={(e) => setAyat(e.target.value)}
              className="bg-background border-border"
            />
          </div>
          <Button type="submit" className="w-full bg-emerald hover:bg-emerald-light text-primary-foreground font-body">
            Simpan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHafalanDialog;
