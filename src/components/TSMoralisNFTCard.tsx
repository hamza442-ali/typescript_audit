import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  TSMoralisNFTAuthCardProps,
  TSMoralisNFTMetadata,
} from "../types/moralis";
import { getMetadataImageSrc } from "../util/nfts";

export default function TSMoralisNFTCard({
  nft,
  onClickAuth,
}: TSMoralisNFTAuthCardProps) {
  const [metadata, setMetadata] = useState<TSMoralisNFTMetadata>();

  useEffect(() => {
    setMetadata(nft.toJSON().metadata);
  }, [nft]);

  if (!metadata) return <></>;

  const cardImage = getMetadataImageSrc(metadata);

  return (
    <Card>
      <CardMedia
        image={cardImage}
        title={metadata.name || "TRDEPASS"}
        sx={{ height: 250 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {metadata.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {nft.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ textAlign: "center", justifyContent: "center" }}>
        {onClickAuth && (
          <Button
            variant="contained"
            size="medium"
            onClick={() => onClickAuth()}
          >
            Login With This Pass
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
