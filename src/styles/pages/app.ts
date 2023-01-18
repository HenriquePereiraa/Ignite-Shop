import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: "1180px",
  margin: "0 auto",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  ".icon": {
    position: "relative",
    padding: "0.75rem 0.85rem",
    backgroundColor: "$gray800",
    borderRadius: 8,
    transition: "background 0.2s ease-in-out",

    cursor: "pointer",

    "&:hover": {
      backgroundColor: "$green300",

      span: {
        backgroundColor: "$gray800",
      },
    },

    span: {
      position: "absolute",
      top: -8,
      right: -10,
      backgroundColor: "$green500",
      width: 25,
      height: 25,
      borderRadius: "50%",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
});
