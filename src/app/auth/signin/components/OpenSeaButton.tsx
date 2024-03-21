import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import configs from "@/lib/config";

const { NFT_PURCHASE_LINK } = configs;

const OpenSeaButton = () => (
  <Button
    href={NFT_PURCHASE_LINK}
    target="_blank"
    rel="noopener noreferrer"
    variant="contained"
    color="primary"
    size="medium"
  >
    <Typography variant="subtitle1" sx={{ marginTop: 0 }}>
      Buy a TRDEPASS on OpenSea for Priority Access
    </Typography>
  </Button>
);

export default OpenSeaButton;
