import { styled } from "@/styles";

export const ShoppingCartContainer = styled("div", {
  position: "fixed",
  zIndex: "1",
  top: 0,
  right: 0,
  maxWidth: "480px",
  width: "100%",
  height: "100vh",
  backgroundColor: "$gray800",
  color: "$white",
  display: "$$displayT",

  header: {
    width: "100%",
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "flex-end",

    span: {
      fontSize: "$2xl",
      color: "$gray300",
      cursor: "pointer",

      "&:hover": {
        color: "$green500",
      },
    },
  },
});

export const ContentMainCart = styled("main", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0 2rem",
  marginTop: "25px",

  ".products": {
    ".product": {
      marginTop: "30px",
      display: "flex",
      gap: "1rem",

      ".product__imageContainer": {
        width: "95px",
        height: "95px",
        borderRadius: "6px",
        background: "linear-gradient(180deg, #1ea486 0%, #7465d4 100%)",
      },

      ".product__content": {
        display: "flex",
        flexDirection: "column",
        gap: ".3rem",

        ".content__title": {
          fontSize: "$md",
          lineHeight: "160%",
          color: "$gray300",
        },

        strong: {
          fontSize: "$md",
          color: "$white",
          lineHeight: "160%",
        },

        ".content__button": {
          fontSize: "1rem",
          color: "$green300",
          lineHeight: "160%",
          fontWeight: "700",
          cursor: "pointer",
        },
      },
    },
  },
  footer: {
    width: "87%",
    position: "absolute",
    bottom: 8,

    ".infos": {
      display: "flex",
      justifyContent: "space-between",
      margin: "20px 0",

      span: {
        fontSize: "1rem",
        color: "$gray100",
        lineHeight: "160%",
      },

      strong: {
        fontSize: "$md",
        fontWeight: "bold",
        color: "$gray100",
        lineHeight: "160%",
      },
    },

    button: {
      width: "100%",
      backgroundColor: "$green500",
      color: "$white",
      border: 0,
      borderRadius: 8,
      padding: "1.25rem",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "$md",

      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },

      "&:not(:disabled):hover": {
        backgroundColor: "$green300",
      },
    },
  },
});
