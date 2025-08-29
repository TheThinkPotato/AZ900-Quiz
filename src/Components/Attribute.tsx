import { Typography } from "@mui/material";

const Attribute = () => {
  return (
    <div style={{ position: "absolute", bottom: "2px", left: "5px" }}>
      <Typography
        gutterBottom
        sx={{
          backgroundColor: "white",
          padding: "5px 10px 5px 10px",
          borderRadius: "5px",
        }}
      >
        Site by Dan Lopez
        <div style={{ fontSize: "12px", color: "gray" }}>
          Image by kelly-sikkema on Unsplash
        </div>
      </Typography>
    </div>
  );
};

export default Attribute;
