/**
 * Official URTH logo files from the brand package.
 * Served from: public/urthstudiobrandingpackage/… (copy of source package)
 * Source of truth: urthstudiobrandingpackage/URTH LOGO PACKAGE/
 */
const PKG = "/urthstudiobrandingpackage/URTH LOGO PACKAGE";

export type BrandLogoVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "brandmark"
  | "wordmark";

export type BrandColor = "cream" | "orange" | "brown" | "blue";

const COLOR_FILE: Record<
  BrandLogoVariant,
  Record<BrandColor, string>
> = {
  primary: {
    cream: "URTH_PRIMARY LOGO SOFT CREAM.svg",
    orange: "URTH_PRIMARY LOGO BOLD ORANGE.svg",
    brown: "URTH_PRIMARY LOGO COOL BROWN.svg",
    blue: "URTH_PRIMARY LOGO LIGHT BLUE.svg",
  },
  secondary: {
    cream: "URTH_SECONDARY LOGO SOFT CREAM.svg",
    orange: "URTH_SECONDARY LOGO BOLD ORANGE.svg",
    brown: "URTH_SECONDARY LOGO COOL BROWN.svg",
    blue: "URTH_SECONDARY LOGO LIGHT BLUE.svg",
  },
  tertiary: {
    cream: "URTH_TERTIARY LOGO SOFT CREAM.svg",
    orange: "URTH_TERTIARY LOGO BOLD ORANGE.svg",
    brown: "URTH_TERTIARY LOGO COOL BROWN.svg",
    blue: "URTH_TERTIARY LOGO SKY BLUE.svg",
  },
  quaternary: {
    cream: "URTH_QUARTENARY LOGO SOFT CREAM.svg",
    orange: "URTH_QUARTENARY LOGO BOLD ORANGE.svg",
    brown: "URTH_QUARTENARY LOGO COOL BROWN.svg",
    blue: "URTH_QUARTENARY LOGO SKY BLUE.svg",
  },
  brandmark: {
    cream: "URTH_BRANDMARK SOFT CREAM.svg",
    orange: "URTH_BRANDMARK BOLD ORANGE.svg",
    brown: "URTH_BRANDMARK COOL BROWN.svg",
    blue: "URTH_BRANDMARK SKY BLUE.svg",
  },
  wordmark: {
    cream: "URTH_WORDMARK SOFT CREAM.svg",
    orange: "URTH_WORDMARK BOLD ORANGE.svg",
    brown: "URTH_WORDMARK COOL BROWN.svg",
    blue: "URTH_WORDMARK SKY BLUE.svg",
  },
};

const FOLDER: Record<BrandLogoVariant, string> = {
  primary: "PRIMARY LOGO",
  secondary: "SECONDARY LOGO",
  tertiary: "TERTIARY LOGO",
  quaternary: "QUARTENARY LOGO",
  brandmark: "BRANDMARK",
  wordmark: "WORDMARK",
};

/** Encode each path segment so spaces work in URLs */
export function brandAsset(...segments: string[]) {
  return (
    "/" +
    ["urthstudiobrandingpackage", "URTH LOGO PACKAGE", ...segments]
      .map(encodeURIComponent)
      .join("/")
  );
}

export function brandLogoSrc(
  variant: BrandLogoVariant = "primary",
  color: BrandColor = "cream",
) {
  return brandAsset(FOLDER[variant], COLOR_FILE[variant][color]);
}

/** The plain orange dot mark only exists in orange — used for the nav bar. */
export function brandDotSrc() {
  return brandAsset(FOLDER.primary, "ORANGE DOT.svg");
}

export function brandPatternSrc(color: BrandColor = "orange") {
  const file =
    color === "cream"
      ? "URTH_BRAND PATTERN SOFT CREAM.svg"
      : color === "brown"
        ? "URTH_BRAND PATTERN COOL BROWN.svg"
        : color === "blue"
          ? "URTH_BRAND PATTERN LIGHT BLUE.svg"
          : "URTH_BRAND PATTERN BOLD ORANGE.svg";
  return brandAsset("BRAND PATTERN", file);
}

export { PKG };
