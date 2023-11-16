import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function CodeModal({ isOpen, handleClose }: IProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/cosa21/coffee-banner/contents/src/App.tsx`
        );

        const decodedContent = atob(response.data.content);

        setCode(decodedContent);
      } catch (error) {
        console.error("Error fetching code:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCode();
    }
  }, [isOpen]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied to clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <Dialog maxWidth="lg" fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">{`That's it! All done!`}</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{ overflow: "auto", maxHeight: 400, border: "1px solid black" }}
          >
            <pre>
              <code>{code}</code>
            </pre>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleCopyClick}
          endIcon={<ContentPasteIcon />}
        >
          {"Copy to Clipboard"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
