import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: "1.4rem",
  },

  a: {
    display: "block",
    marginTop: "5rem",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImageSlideWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 145,
  height: 140,
  background: "linear-gradient(180deg, #1ea486 0%, #7465d4 100%)",
  borderRadius: "50%",
  padding: "0.25rem",
  marginTop: "4rem;",
  marginLeft: "-50px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});
