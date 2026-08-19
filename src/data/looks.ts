export type Season = "winter" | "spring" | "summer" | "autumn";

export type LookMotion = "bob" | "sway" | "spin";

export type DailyLook = {
  id: string;
  label: string;
  seasons: (Season | "any")[];
  motion: LookMotion;
  /** Rare. Weighted down in the daily pick. */
  egg?: boolean;
  note?: string;
};

/**
 * Fifty small cutout looks. Festivities still win.
 * Winter leans citrus and wool (Barcelona winter), summer leans sea and hill.
 */
export const dailyLooks: DailyLook[] = [
  { id: "snowflake", label: "A paper snowflake.", seasons: ["winter"], motion: "spin" },
  { id: "mitten", label: "One warm mitten.", seasons: ["winter"], motion: "bob" },
  { id: "cocoa", label: "A mug of cocoa.", seasons: ["winter"], motion: "bob" },
  { id: "scarf", label: "A navy wool scarf.", seasons: ["winter"], motion: "sway" },
  { id: "orange", label: "A winter orange.", seasons: ["winter"], motion: "bob" },
  { id: "pinecone", label: "A small pine cone.", seasons: ["winter"], motion: "bob" },
  { id: "icicle", label: "A glass icicle.", seasons: ["winter"], motion: "sway" },
  { id: "beanie", label: "A soft beanie.", seasons: ["winter"], motion: "bob" },
  { id: "soup", label: "A bowl of soup.", seasons: ["winter"], motion: "bob" },
  { id: "frost", label: "A frosted leaf.", seasons: ["winter"], motion: "spin" },
  { id: "log", label: "A fireplace log.", seasons: ["winter"], motion: "bob" },
  { id: "snowball", label: "A tidy snowball.", seasons: ["winter"], motion: "bob" },

  { id: "blossom", label: "A spring blossom.", seasons: ["spring"], motion: "sway" },
  { id: "raincloud", label: "A small rain cloud.", seasons: ["spring"], motion: "bob" },
  { id: "umbrella", label: "A cream umbrella.", seasons: ["spring"], motion: "sway" },
  { id: "sprout", label: "A green sprout.", seasons: ["spring"], motion: "bob" },
  { id: "bee", label: "A busy bee.", seasons: ["spring"], motion: "bob" },
  { id: "tulip", label: "A single tulip.", seasons: ["spring"], motion: "sway" },
  { id: "kite", label: "A paper kite.", seasons: ["spring"], motion: "sway" },
  { id: "rainboot", label: "A yellow rain boot.", seasons: ["spring"], motion: "bob" },
  { id: "sparrow", label: "A little sparrow.", seasons: ["spring"], motion: "bob" },
  { id: "daisy", label: "A daisy.", seasons: ["spring"], motion: "spin" },
  { id: "can", label: "A watering can.", seasons: ["spring"], motion: "bob" },
  { id: "ladybug", label: "A ladybird.", seasons: ["spring"], motion: "bob" },

  { id: "wave", label: "A little wave.", seasons: ["summer"], motion: "sway" },
  { id: "shell", label: "A sea shell.", seasons: ["summer"], motion: "bob" },
  { id: "mountain", label: "A far mountain.", seasons: ["summer"], motion: "bob" },
  { id: "gelato", label: "A scoop of gelato.", seasons: ["summer"], motion: "bob" },
  { id: "fan", label: "A paper fan.", seasons: ["summer"], motion: "sway" },
  { id: "lemon", label: "A bright lemon.", seasons: ["summer"], motion: "bob" },
  { id: "sail", label: "A tiny sail.", seasons: ["summer"], motion: "sway" },
  { id: "sandal", label: "A summer sandal.", seasons: ["summer"], motion: "bob" },
  { id: "peach", label: "A ripe peach.", seasons: ["summer"], motion: "bob" },
  { id: "bike", label: "A city bicycle.", seasons: ["summer"], motion: "bob" },
  { id: "shades", label: "A pair of shades.", seasons: ["summer"], motion: "bob" },
  { id: "palm", label: "A palm leaf.", seasons: ["summer"], motion: "sway" },

  { id: "leaf", label: "A falling leaf.", seasons: ["autumn"], motion: "sway" },
  { id: "mushroom", label: "A woodland mushroom.", seasons: ["autumn"], motion: "bob" },
  { id: "acorn", label: "An acorn.", seasons: ["autumn"], motion: "bob" },
  { id: "gust", label: "A little gust.", seasons: ["autumn"], motion: "sway" },
  { id: "pear", label: "A green pear.", seasons: ["autumn"], motion: "bob" },
  { id: "sock", label: "A navy sock.", seasons: ["autumn", "winter"], motion: "sway" },
  { id: "teapot", label: "A small teapot.", seasons: ["autumn", "winter"], motion: "bob" },
  { id: "moon", label: "An early moon.", seasons: ["autumn"], motion: "bob" },

  { id: "pencil", label: "A yellow pencil.", seasons: ["any"], motion: "bob", egg: true, note: "Yellow, of course." },
  { id: "swallow", label: "A swallow.", seasons: ["any"], motion: "sway", egg: true, note: "Mriya, quietly." },
  { id: "keycap", label: "A keyboard key.", seasons: ["any"], motion: "bob", egg: true, note: "Still typing." },
  { id: "droplet", label: "A glass drop.", seasons: ["any"], motion: "bob", egg: true, note: "Yes, Liquid Glass." },
  { id: "stamp", label: "A postage stamp.", seasons: ["any"], motion: "bob", egg: true },
  { id: "paperplane", label: "A paper plane.", seasons: ["any"], motion: "sway", egg: true },
];

export const LOOK_IDS = dailyLooks.map((look) => look.id);

export function getLook(id: string | null | undefined) {
  if (!id) return null;
  return dailyLooks.find((look) => look.id === id) ?? null;
}
