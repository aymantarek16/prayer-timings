import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Prayer = ({ img, name, time }) => {
  return (
    <div>
      <Card sx={{ minWidth: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt="Prayer Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>

            
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", fontSize: "28px", color: "green" }}
            >
              {time}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Prayer;
