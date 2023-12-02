import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ProjectInfo from "./ProjectInfo";
import { useTheme } from "@mui/material/styles";


function ProjectCard({ course }) {
  const theme = useTheme();

  return (
    <Card
      className="flex flex-col h-288 shadow"
      style={{ borderBottom: "2px solid" + theme.palette.secondary.main }}
    >
      <CardContent className="flex flex-col flexs-auto p-24">
        <ProjectInfo course={course} />
      </CardContent>
    </Card>
  );
}
export default ProjectCard;
