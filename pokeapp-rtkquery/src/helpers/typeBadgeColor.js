export const TYPE_BADGE_COLORS = {
  ["normal"]: {
    bg: "bg-gray-500",
    text: "",
  },
  ["agua"]: {
    bg: "bg-blue-500",
    text: "",
  },
  ["fuego"]: {
    bg: "bg-orange-500",
    text: "",
  },
  ["planta"]: {
    bg: "bg-green-500",
    text: "",
  },
};

export const getTypeBadgeColor = (type) => {
  const _type = type.toLowerCase();

  if (TYPE_BADGE_COLORS.hasOwnProperty(type)) return TYPE_BADGE_COLORS[_type];
  return TYPE_BADGE_COLORS["normal"];
};
