const TAG_COLOR_MAPPING: Record<string, string> = {
  fitness: "green",
  groceries: "blue",
  pharmacy: "yellow",
  restaurant: "orange",
  "rent and energies": "red",
  transportation: "purple"
};

export const getTagClassByName = (name: string) => TAG_COLOR_MAPPING[name] || "gray";
