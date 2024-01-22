import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Box,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MainAccordion = ({ post, showCommentsHandler }) => {
  return (
    <Accordion sx={{ backgroundColor: "dark" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{post.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{post.body}</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => showCommentsHandler(post.userId)}>
            Show Comments
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MainAccordion;
