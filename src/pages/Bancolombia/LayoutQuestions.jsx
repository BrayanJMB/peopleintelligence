import logo2 from "./img/Logotipo.png";
export const LayoutQuestions = ({title, color}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        marginBottom:"10px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `${color}`,
          width: "60%",
          borderRadius: "20px",
        }}
      >
        <h2 style={{ fontSize: "30px" }}>{title}</h2>
      </div>
      <img src={logo2} alt="some" style={{ padding: "1rem" }} />
    </div>
  );
};
